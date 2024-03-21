from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from bs4 import BeautifulSoup
import os
import logging
import json
import base64

import click
import google.auth.transport.grpc
import google.auth.transport.requests
import google.oauth2.credentials

import cv2
import mediapipe as mp
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image

from v1alpha2 import (
    embedded_assistant_pb2,
    embedded_assistant_pb2_grpc
)

try:
    from . import (
        assistant_helpers
    )
except (SystemError, ImportError):
    import assistant_helpers

app = Flask(__name__)
CORS(app)

# ASL model
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.3)

letters = [chr(letter) for letter in range(ord('A'), ord('Z')+1) if chr(letter) not in ('J', 'Z')]

model = load_model('../model/Models/ASL_model.h5')

# Returns ASL sign detected in frame as text
def return_prediction(frame):
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    res = hands.process(frame_rgb)

    # Make Prediction and yield result
    predict_text = ""
    if res.multi_hand_landmarks:
        for hand_landmarks in res.multi_hand_landmarks:
            hand_sequence = np.array([[landmark.x, landmark.y] for landmark in hand_landmarks.landmark])
            hand_sequence = hand_sequence.reshape(1, -1)
            pred = model.predict(hand_sequence)
            predict_text = letters[np.argmax(pred)]
    return predict_text


# Google Assistant API
ASSISTANT_API_ENDPOINT = 'embeddedassistant.googleapis.com'
DEFAULT_GRPC_DEADLINE = 60 * 3 + 5
PLAYING = embedded_assistant_pb2.ScreenOutConfig.PLAYING

class SampleTextAssistant(object):
    """Sample Assistant that supports text based conversations.

    Args:
      language_code: language for the conversation.
      device_model_id: identifier of the device model.
      device_id: identifier of the registered device instance.
      display: enable visual display of assistant response.
      channel: authorized gRPC channel for connection to the
        Google Assistant API.
      deadline_sec: gRPC deadline in seconds for Google Assistant API call.
    """

    def __init__(self, language_code, device_model_id, device_id,
                 display, channel, deadline_sec):
        self.language_code = language_code
        self.device_model_id = device_model_id
        self.device_id = device_id
        self.conversation_state = None
        # Force reset of first conversation.
        self.is_new_conversation = True
        self.display = display
        self.assistant = embedded_assistant_pb2_grpc.EmbeddedAssistantStub(
            channel
        )
        self.deadline = deadline_sec

    def __enter__(self):
        return self

    def __exit__(self, etype, e, traceback):
        if e:
            return False

    def assist(self, text_query):
        """Send a text request to the Assistant and playback the response.
        """
        def iter_assist_requests():
            config = embedded_assistant_pb2.AssistConfig(
                audio_out_config=embedded_assistant_pb2.AudioOutConfig(
                    encoding='MP3',
                    sample_rate_hertz=24000,
                    volume_percentage=100,
                ),
                dialog_state_in=embedded_assistant_pb2.DialogStateIn(
                    language_code=self.language_code,
                    conversation_state=self.conversation_state,
                    is_new_conversation=self.is_new_conversation,
                ),
                device_config=embedded_assistant_pb2.DeviceConfig(
                    device_id=self.device_id,
                    device_model_id=self.device_model_id,
                ),
                text_query=text_query,
            )
            # Continue current conversation with later requests.
            self.is_new_conversation = False
            if self.display:
                config.screen_out_config.screen_mode = PLAYING
            req = embedded_assistant_pb2.AssistRequest(config=config)
            assistant_helpers.log_assist_request_without_audio(req)
            yield req

        text_response = None
        html_response = None
        audio_response = b""
        show_text_content = None
        for resp in self.assistant.Assist(iter_assist_requests(),
                                          self.deadline):
            assistant_helpers.log_assist_response_without_audio(resp)
            if resp.screen_out.data:
                html_response = resp.screen_out.data
                soup = BeautifulSoup(html_response, "html.parser")
                html_response = soup.find("div", id = "assistant-card-content")
                show_text_content = soup.find("div", {"class": "show_text_content"})
                if html_response:
                    text_response = html_response.get_text(separator = "\n", strip = True)
            if resp.dialog_state_out.conversation_state:
                conversation_state = resp.dialog_state_out.conversation_state
                self.conversation_state = conversation_state
            if resp.dialog_state_out.supplemental_display_text:
                text_response = resp.dialog_state_out.supplemental_display_text
            if resp.audio_out.audio_data:
                audio_response += resp.audio_out.audio_data
        return text_response, html_response, audio_response, show_text_content


@click.command()
@click.option('--api-endpoint', default=ASSISTANT_API_ENDPOINT,
              metavar='<api endpoint>', show_default=True,
              help='Address of Google Assistant API service.')
@click.option('--credentials',
              metavar='<credentials>', show_default=True,
              default=os.path.join(click.get_app_dir('google-oauthlib-tool'),
                                   'credentials.json'),
              help='Path to read OAuth2 credentials.')
@click.option('--device-model-id',
              metavar='<device model id>',
              required=True,
              help=(('Unique device model identifier, '
                     'if not specifed, it is read from --device-config')))
@click.option('--device-id',
              metavar='<device id>',
              required=True,
              help=(('Unique registered device instance identifier, '
                     'if not specified, it is read from --device-config, '
                     'if no device_config found: a new device is registered '
                     'using a unique id and a new device config is saved')))
@click.option('--lang', show_default=True,
              metavar='<language code>',
              default='en-US',
              help='Language code of the Assistant')
@click.option('--display', is_flag=True, default=True,
              help='Enable visual display of Assistant responses in HTML.')
@click.option('--verbose', '-v', is_flag=True, default=False,
              help='Verbose logging.')
@click.option('--grpc-deadline', default=DEFAULT_GRPC_DEADLINE,
              metavar='<grpc deadline>', show_default=True,
              help='gRPC deadline in seconds')


def main(api_endpoint, credentials,
         device_model_id, device_id, lang, display, verbose,
         grpc_deadline, *args, **kwargs):
    # Setup logging.
    logging.basicConfig(level=logging.DEBUG if verbose else logging.ERROR)
    logging.getLogger("werkzeug").disabled = True
    # Load OAuth 2.0 credentials.
    try:
        with open(credentials, 'r') as f:
            credentials = google.oauth2.credentials.Credentials(token=None,
                                                                **json.load(f))
            http_request = google.auth.transport.requests.Request()
            credentials.refresh(http_request)
    except Exception as e:
        logging.error('Error loading credentials: %s', e)
        logging.error('Run google-oauthlib-tool to initialize '
                      'new OAuth 2.0 credentials.')
        return

    # Create an authorized gRPC channel.
    grpc_channel = google.auth.transport.grpc.secure_authorized_channel(
        credentials, http_request, api_endpoint)
    logging.info('Connecting to %s', api_endpoint)

    global assistant
    assistant = SampleTextAssistant(lang, device_model_id, device_id, display,
                             grpc_channel, grpc_deadline)
    
    app.run(host='0.0.0.0', port=4000)


@app.route('/send/<user_query>', methods=['GET'])
def send(user_query):
    response_text, response_html, audio_response, show_text_content = assistant.assist(text_query=user_query)

    audio = base64.b64encode(audio_response).decode('ascii')

    if (show_text_content):
        return jsonify({'response_text': response_text, 'response_html': "", 'audio_response': audio})
    else:
        response_text2, response_html2, audio_response2, show_text_content2 = assistant.assist(text_query="what")
        
        response_text2 = response_text2.replace("Sure: ", "")
        if (response_html != None):
            return jsonify({'response_text': response_text2, 'response_html': str(response_html), 'audio_response': audio})
        else:
            return jsonify({'response_text': response_text2, 'response_html': "", 'audio_response': audio})

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    data = request.files['image']
    pil_image = Image.open(data)
    # Convert the PIL Image to format acceptable by cv2
    new_image = np.array(pil_image)
    prediction_text = return_prediction(new_image)
    return jsonify(prediction_text=prediction_text)

if __name__ == '__main__':
    main()
