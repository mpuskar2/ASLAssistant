import React from 'react';

export default function Text() {
  
  function addInput(){
    // For testing purposes, inVal represents the model output
    let br = document.createElement("br");
    let inVal = document.getElementById("chatbox-input-text").value;

    // Sends the typed text to the backend and receive a response from the assistant
    // This should eventually show the signed input as text and appropriate response
    if (inVal !== "") {
      let div = document.getElementById("titleDiv");
      let input = document.createElement("output");
      input.value = "You: " + inVal;
      div.appendChild(input);
      div.appendChild(br);
      let path = "/send/" + inVal;
      fetch(path).then(res => res.text()
      .then(data => {
        addOutput(data);
      }));
    }
  }

  function addOutput(outVal){
    let br = document.createElement("br");
    let div = document.getElementById("titleDiv");
    let output = document.createElement("output");
    output.value = "Google Assistant: " + outVal;
    div.appendChild(output);
    div.appendChild(br);
    
  }

  


    return (
      <>
      <input type="text" id="chatbox-input-text" placeholder="Type your message here..." />
      <button onClick={() => addInput()} id="chatbox-input-submit">Send</button>
      <div id="titleDiv">
         
      </div>
      </>
    )
  }
  