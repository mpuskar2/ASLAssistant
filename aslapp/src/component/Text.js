import React, { useState } from 'react';

export default function Text() {
  const [textToSpeechEnabled, setTextToSpeechEnabled] = useState(false);

  function addInput() {
    let br = document.createElement("br");
    let inVal = document.getElementById("chatbox-input-text").value;

    if (inVal !== "") {
      let div = document.getElementById("titleDiv");
      let input = document.createElement("output");
      input.style.color = "#fff";
      input.value = "You: " + inVal;
      div.appendChild(input);
      div.appendChild(br);
      let path = window.location.protocol + "//" + window.location.hostname + ":4000/send/" + inVal;
      fetch(path)
        .then(res => res.text()
          .then(data => {
            const output = JSON.parse(data);
            addOutput(output.response_text);
          
            if (output.response_html !== "") {
              let html = document.createElement('div');
              html.innerHTML = output.response_html;
              div.appendChild(html);
            }

            if (textToSpeechEnabled) {
              speak(output.response_text);
            }
          }));
    }
  }

  function addOutput(outVal) {
    let br = document.createElement("br");
    let div = document.getElementById("titleDiv");
    let output = document.createElement("output");
    output.style.color = "#fff";
    output.value = "Google Assistant: " + outVal;
    div.appendChild(output);
    div.appendChild(br);
  }

  function speak(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  }

  function clearChatLog() {
    document.getElementById("titleDiv").innerHTML = "";
  }

  return (
    <>
      <input type="text" id="chatbox-input-text" placeholder="Type your message here..." />
      <button onClick={() => addInput()} id="chatbox-input-submit">Send</button>
      <button onClick={() => setTextToSpeechEnabled(!textToSpeechEnabled)}>
        {textToSpeechEnabled ? 'Disable Text-to-Speech' : 'Enable Text-to-Speech'}
      </button>
      <button onClick={() => clearChatLog()}>Clear Chat</button>
      <div id="titleDiv"></div>
    </>
  );
}
