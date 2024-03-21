import './App.css';
import Settings from './component/Settings';
import Camera from './component/Camera';
import Text from './component/Text';
import Title from './component/Title';

import React, { useState } from 'react';

function App() {
  const [ttsEnabled, setttsEnabled] = useState(false);
  return (
    <>
    <Title/>
    <Settings/>
    <Camera ttsEnabled={ttsEnabled}/>
    <Text ttsEnabled={ttsEnabled} setttsEnabled={setttsEnabled}/>
    </>
  );
}

export default App;
