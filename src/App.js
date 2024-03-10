import React from 'react';
import './App.css'; // Import your CSS file if needed
import CaesarCipher from './CaesarCipher';
import PolyalphabeticCipher from './PolyalphabeticCipher';
import MonoalphabeticCipher from './MonoalphabeticCipher';
import PlayfairCipher from './PlayfairCipher';

function App() {
  return (
    <div className="App">
      <CaesarCipher />
      <PolyalphabeticCipher />
      <MonoalphabeticCipher />
      <PlayfairCipher />
    </div>
  );
}

export default App;
