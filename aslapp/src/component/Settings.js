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
              <td>A = </td>
              <td>G = </td>
              <td>N = </td>
              <td>T = </td>
            </tr>
            <tr>
              <td>B = </td>
              <td>H = </td>
              <td>O = </td>
              <td>U = </td>
            </tr>
            <tr>
              <td>C = </td>
              <td>I = </td>
              <td>P = </td>
              <td>V = </td>
            </tr>
            <tr>
              <td>D = </td>
              <td>K = </td>
              <td>Q = </td>
              <td>W = </td>
            </tr>
            <tr>
              <td>E = </td>
              <td>L = </td>
              <td>R = </td>
              <td>X = </td>
            </tr>
            <tr>
              <td>F = </td>
              <td>M = </td>
              <td>S = </td>
              <td>Y = </td>
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
