import './App.css';
import Settings from './component/Settings';
import Camera from './component/Camera';
import Text from './component/Text';
import Title from './component/Title';

import React, { useState } from 'react';

function App() {
  const [ttsEnabled, setttsEnabled] = useState(false);
  const [commands, setCommands] = useState(() => initCommands());

  function initCommands() {
    let commands = {
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
    };

    let lsCommands = JSON.parse(localStorage.getItem("commands"));
    if (lsCommands) {
      commands = lsCommands;
    }
    return commands;
  }
  
  return (
    <>
    <Title/>
    <Settings commands={commands} setCommands={setCommands}/>
    <Camera ttsEnabled={ttsEnabled} commands={commands}/>
    <Text ttsEnabled={ttsEnabled} setttsEnabled={setttsEnabled}/>
    </>
  );
}

export default App;
