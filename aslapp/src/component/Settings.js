import React, { useState } from 'react';

export default function Settings({commands, setCommands}) {
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
      <>
      <div className="whiteText">
          <h2>Here is the legend:</h2>
          <table id="iTable">
            <tr>
              <td>A = {commands["A"]}</td>
              <td>G = {commands["G"]}</td>
              <td>N = {commands["N"]}</td>
              <td>T = {commands["T"]}</td>
            </tr>
            <tr>
              <td>B = {commands["B"]}</td>
              <td>H = {commands["H"]}</td>
              <td>O = {commands["O"]}</td>
              <td>U = {commands["U"]}</td>
            </tr>
            <tr>
              <td>C = {commands["C"]}</td>
              <td>I = {commands["I"]}</td>
              <td>P = {commands["P"]}</td>
              <td>V = {commands["V"]}</td>
            </tr>
            <tr>
              <td>D = {commands["D"]}</td>
              <td>K = {commands["K"]}</td>
              <td>Q = {commands["Q"]}</td>
              <td>W = {commands["W"]}</td>
            </tr>
            <tr>
              <td>E = {commands["E"]}</td>
              <td>L = {commands["L"]}</td>
              <td>R = {commands["R"]}</td>
              <td>X = {commands["X"]}</td>
            </tr>
            <tr>
              <td>F = {commands["F"]}</td>
              <td>M = {commands["M"]}</td>
              <td>S = {commands["S"]}</td>
              <td>Y = {commands["Y"]}</td>
            </tr>
          </table>
      </div>
      <div className="whiteText">
      <h2>Modify commands:</h2>
      <p>If you'd like to remap the commands, you can do so below:</p>
        <select id="dropdown">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
          <option value="H">H</option>
          <option value="I">I</option>
          <option value="K">K</option>
          <option value="L">L</option>
          <option value="M">M</option>
          <option value="N">N</option>
          <option value="O">O</option>
          <option value="P">P</option>
          <option value="Q">Q</option>
          <option value="R">R</option>
          <option value="S">S</option>
          <option value="T">T</option>
          <option value="U">U</option>
          <option value="V">V</option>
          <option value="W">W</option>
          <option value="X">X</option>
          <option value="Y">Y</option>
        </select>
        <input type="text" id="change-input-text" placeholder="Type new command here..."/>
        <button onClick={() => changeCommand()} id="change-submit">Change</button>
        <button onClick={() => resetDefaults()} id="reset-values">Reset All</button>
      </div>
      </>
    );
  }

  function changeCommand() {
    let letterVal = document.getElementById("dropdown").value;
    let inVal = document.getElementById("change-input-text").value;
    inVal = inVal.replace(/[^\w\s]/gi, '');
    inVal = inVal.trim();
    if (inVal !== "") {
      setCommands(commands => ({
        ...commands,
        [letterVal]: inVal
      }));
      localStorage.setItem("commands", JSON.stringify(commands));
    }
    else {
      alert("Field cannot be blank");
    }
  }

  function resetDefaults() {
    setCommands(commands => ({
      "A":"Where's the nearest ATM?",
      "B":"When does the bus to get to Masonville Place come?",
      "C":"Flip a coin",
      "D":"What's the date?",
      "E":"When is the bus to get home?",
      "F":"Tell me a fun fact",
      "G":"Tell me a joke",
      "H":"What are the Western Rec Center hours?",
      "I":"Directions to Toronto",
      "K":"What's 20% of 40?",
      "L":"How much protein is in an egg?",
      "M":"Where's the nearest pharmacy?",
      "N":"When does the sun rise?",
      "O":"Roll a dice",
      "P":"Read me a poem",
      "Q":"Directions to nearest restaurant",
      "R":"What are some nearby restaurants?",
      "S":"When does the sun set?",
      "T":"What's the time?",
      "U":"Do I need an umbrella?",
      "V":"Do I need an umbrella?",
      "W":"What's the weather?",
      "X":"What will the weather be tomorrow?",
      "Y":"What will the weather be next week?",
    }));
    localStorage.setItem("commands", JSON.stringify(commands));
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
