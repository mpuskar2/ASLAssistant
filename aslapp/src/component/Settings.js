import React, { useState } from 'react';

export default function Settings() {
  const [isShown, setIsShown] = useState(false);
  const [showAdditionalDiv, setShowAdditionalDiv] = useState(false);

  function toggleSettings() {
    setIsShown(!isShown);
  }

  function toggleAdditionalDiv() {
    setShowAdditionalDiv(!showAdditionalDiv);
  }

  function renderSettings() {
    return (
      <div className="whiteText">
        <h2>Welcome to the ASL assistant tool!</h2>
        <p>
        To start click the button below to show what letters you can sign into the camera and what commands they are linked to. <br/>
        Once you start signing you will get a response from the assistant which you can have read out to you via text to speech if you would like by enabling text to speech with the button below. <br/>
        You can clear the chat history by clicking the clear chat button. <br/>
        If you would prefer typing your command you can use the text input field and click send. <br/>
        </p>
        <button onClick={toggleAdditionalDiv}>Show letter to command legend</button>
      </div>
    );
  }

  function renderAdditionalDiv() {
    return (
      <div className="whiteText">
          <h2>Here is the legend:</h2>
          <table id="iTable">
            <tr>
              <td>A = Where's the nearest ATM?</td>
              <td>G = Tell me a joke</td>
              <td>N = When does the sun rise?</td>
              <td>T = What's the time?</td>
            </tr>
            <tr>
              <td>B = When does the bus to get to Masonville Place come?</td>
              <td>H = What are the Western Rec Center hours?</td>
              <td>O = Roll a dice</td>
              <td>U = Do I need an umbrella?</td>
            </tr>
            <tr>
              <td>C = Flip a coin</td>
              <td>I = Directions to Toronto</td>
              <td>P = Read me a poem</td>
              <td>V = Do I need an umbrella?</td>
            </tr>
            <tr>
              <td>D = What's the date?</td>
              <td>K = What's 20% of 40?</td>
              <td>Q = Directions to nearest restaurant</td>
              <td>W = What's the weather?</td>
            </tr>
            <tr>
              <td>E = When is the bus to get home?</td>
              <td>L = How much protein is in an egg?</td>
              <td>R = What are some nearby restaurants?</td>
              <td>X = What will the weather be tomorrow?</td>
            </tr>
            <tr>
              <td>F = Tell me a fun fact</td>
              <td>M = Where's the nearest pharmacy?</td>
              <td>S = When does the sun set?</td>
              <td>Y = What will the weather be next week?</td>
            </tr>
          </table>
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={toggleSettings}>Show Instructions</button>
      </div>
      {isShown && (
        <div id="settingsDiv">
          {renderSettings()}
          {showAdditionalDiv && renderAdditionalDiv()}
        </div>
      )}
    </div>
  );
}
