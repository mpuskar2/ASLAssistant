from flask import Flask, jsonify, render_template, Response
from flask_cors import CORS
import os
import cv2
import mediapipe as mp
import numpy as np
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.3)

DATA_PATH = '../../model/Data'
letters = [d for d in os.listdir(DATA_PATH) if os.path.isdir(os.path.join(DATA_PATH, d))]

model = load_model('../../model/Models/ASL_model.h5')


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


def generate_frames():
    cap = cv2.VideoCapture(0)
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        res = hands.process(frame_rgb)

        prediction_text = ""
        if res.multi_hand_landmarks:
            for hand_landmarks in res.multi_hand_landmarks:
                mp_drawing.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS,
                                          mp_drawing.DrawingSpec(color=(255, 0, 0), thickness=5, circle_radius=4),
                                          mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=3, circle_radius=2))

        prediction_text = return_prediction(frame)
        cv2.putText(frame, prediction_text, (120, 140 - 10), cv2.FONT_HERSHEY_SIMPLEX, 1.3, (0, 0, 0), 3,
                    cv2.LINE_AA)

        _, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n'
               b'Content-Type: text/plain\r\n\r\n' + prediction_text.encode('utf-8') + b'\r\n')
        


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/get_prediction')
def get_prediction_route():
    cap = cv2.VideoCapture(0)
    ret, frame = cap.read()
    if not ret:
        return jsonify(prediction_text="")
    
    prediction_text = return_prediction(frame)
    cap.release()
    
    return jsonify(prediction_text=prediction_text)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
