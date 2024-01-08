const GoogleAssistant = require('./googleassistant');
const deviceCredentials = require('../devicecredentials.json');

const CREDENTIALS = {
  client_id: deviceCredentials.client_id,
  client_secret: deviceCredentials.client_secret,
  refresh_token: deviceCredentials.refresh_token,
  type: "authorized_user"
};

const assistant = new GoogleAssistant(CREDENTIALS);

const express = require('express');
const app = express();
const port = 4000;
const router = express.Router();

// Set up front end
app.use('/', express.static('static'));

// Enable CORS for all routes
 app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*'); // should replace '*' with frontend's actual origin
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
   next();
 });

app.get('/send/:message', (req, res) => {
  // This should eventually take the camera input frames and send them to the model
  // Get back response from model and input to assistant, send back to frontend
  
  const mes = req.params.message;
  console.log(mes);
  assistant.assist(mes)
  .then(({ text }) => {
    console.log(text);
    res.send(text);
  });
});

app.listen(port, () => {
  console.log(`ASL App listening on port ${port}`);
});
