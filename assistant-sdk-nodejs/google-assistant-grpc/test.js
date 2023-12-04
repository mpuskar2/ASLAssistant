const GoogleAssistant = require('./googleassistant');
const deviceCredentials = require('../devicecredentials.json');

const CREDENTIALS = {
  client_id: deviceCredentials.client_id,
  client_secret: deviceCredentials.client_secret,
  refresh_token: deviceCredentials.refresh_token,
  type: "authorized_user"
};

const assistant = new GoogleAssistant(CREDENTIALS);

assistant.assist('what time is it')
  .then(({ text }) => {
    console.log(text); // Will log "It's 12:30"
  });

assistant.assist('tell me a joke')
  .then(({ text }) => {
    console.log(text);
});