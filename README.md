# SE4450-Capstone: Group 17
Capstone project - ASL Assistant

Front end Node modules imports:
react-webcam

Necessary assistant-sdk files pulled from: https://github.com/googlesamples/assistant-sdk-python

googleassistant.js pulled from: https://github.com/googlesamples/assistant-sdk-nodejs

ASL dataset used to train model (No J or Z): https://www.kaggle.com/datasets/signnteam/asl-sign-language-pictures-minus-j-z/data

![Preview Image](https://t4.ftcdn.net/jpg/03/60/42/61/360_F_360426181_xubOrGR3vGFq8C2K2xpamRsJujyrCPvz.jpg)

In order to allow the backend to communicate with Google Assistant, please do the following:

Unix:
* python3 -m venv env
* env/bin/python -m pip install --upgrade pip setuptools wheel
* source env/bin/activate
* cd assistant-sdk-python
* pip install --upgrade -r requirements.txt
* google-oauthlib-tool --scope https://www.googleapis.com/auth/assistant-sdk-prototype --save --client-secrets /path/to/client_secret_client-id.json

Windows:
* python -m venv env
* env\Scripts\python -m pip install --upgrade pip setuptools wheel
* env\Scripts\activate
* cd assistant-sdk-python
* pip install --upgrade -r requirements.txt
* google-oauthlib-tool --scope https://www.googleapis.com/auth/assistant-sdk-prototype --save --client-secrets /path/to/client_secret_client-id.json

Run backend with:
python -m textinput --device-model-id "MODEL-ID" --device-id "DEVICE-ID"
