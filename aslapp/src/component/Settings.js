import React from 'react';

export default function Settings() {
  let tracker = false;
    // function showSettings() {
    //   let div = document.getElementById("settingsDiv");

    //   if(!div.firstChildChild){
    //     let br = document.createElement("br")
    //     // setting1Button.innerText("setting 1 toggle");
    //     let setting1Button = document.createElement("BUTTON");
    //     setting1Button.onclick = function () {
    //       showSettings();
    //     }
    //     div.append(br);
    //     div.append(setting1Button);
    //   } else {
    //     while(div.hasChildNodes){
    //       div.remove(div.firstChild);
    //     }
    //   }      
    // }
    function addButton() {
      if (tracker == false){
         var div = document.getElementById("settingsDiv");
        var button = document.createElement("button");
        button.innerHTML = "New Button";
        div.appendChild(button);

        tracker = true;
      } else{
       removeElements();
      }

    }

    function removeElements() {
      tracker = false;
      var div = document.getElementById("settingsDiv");
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
    }

    return (
      <div> 
        <div>
          <button onClick={() => addButton() }> show settings</button>
          </div>
        <div id="settingsDiv">

        </div>
      </div>
    )
  }
  