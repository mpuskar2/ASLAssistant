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
      <div>
        Welcome to the ASL to assistant tool!
        <br></br>
        To start click the button below to show what letters you can sign into the camera and what commands they are linked to.
        <br></br>
        Once you start signing you will get a responce from the assistant which you can have read out to you via text to speach if you would like by enabling text to speach with the button bellow.
        <br></br>
        You can clear the chat history by clicking the clear chat button.
        <br></br>
        If you would prefer typing your comand you can use the text input feild and click send.
        <br></br>
        <button onClick={toggleAdditionalDiv}>Show letter to comand legend</button>
      </div>
    );
  }

  function renderAdditionalDiv() {
    return (
      <div>
        Here is the legend:
        <br></br>
        a = 
        <br></br>
        b = 
        <br></br>
        c = 
        <br></br>
        d = 
        <br></br>
        e = 
        <br></br>
        f = 
        <br></br>
        g = 
        <br></br>
        h = Hi
        <br></br>
        i = 
        <br></br>
        j = 
        <br></br>
        l = 
        <br></br>
        m = 
        <br></br>
        n = 
        <br></br>
        o = 
        <br></br>
        p = 
        <br></br>
        q = 
        <br></br>
        r = 
        <br></br>
        s = 
        <br></br>
        t = test
        <br></br>
        u = 
        <br></br>
        v = 
        <br></br>
        w = weather
        <br></br>
        x = 
        <br></br>
        y = 
        <br></br>
        z = 
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
