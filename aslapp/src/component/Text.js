import React from 'react';

export default function Text() {
  
  function addInput(){
    let br = document.createElement("br");
    let inVal = document.getElementById("chatbox-input-text").value;
    let div = document.getElementById("titleDiv");
    let input = document.createElement("output");
    input.value = inVal;
    div.appendChild(input);
    div.appendChild(br);
    addOutput("output");
  }

  function addOutput(outVal){
    let br = document.createElement("br");
    let div = document.getElementById("titleDiv");
    let output = document.createElement("output");
    output.value = outVal;
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
  