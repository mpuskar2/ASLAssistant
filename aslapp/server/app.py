from flask import Flask, jsonify, render_template, Response, request
from flask_cors import CORS
import os
import cv2
import mediapipe as mp
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image

app = Flask(__name__)
CORS(app)

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.3)

letters = [chr(letter) for letter in range(ord('A'), ord('Z')+1) if chr(letter) not in ('J', 'Z')]

model = load_model('../../model/Models/ASL_model.h5')

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
    app.run(debug=True, port=5000)