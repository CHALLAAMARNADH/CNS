import React, { useState } from 'react';
import './monoalphabetic.css'; // Import your CSS file for styling

const MonoalphabeticCipher = () => {
  const [plaintext, setPlaintext] = useState('');
  const [key, setKey] = useState('');
  const [cipherText, setCipherText] = useState('');

  const encryptMonoalphabetic = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let data = plaintext.toUpperCase();
    let keyUpper = key.toUpperCase();
    let result = "";

    // Create a mapping between the alphabet and the key
    const keyMap = {};
    for (let i = 0; i < alphabet.length; i++) {
      keyMap[alphabet[i]] = keyUpper[i % keyUpper.length];
    }

    // Encrypt the plaintext
    for (let i = 0; i < data.length; i++) {
      if (data[i] >= 'A' && data[i] <= 'Z') {
        result += keyMap[data[i]];
      } else {
        result += data[i];
      }
    }

    setCipherText(result);
  };

  return (
    <div className="monoalphabetic-container">
      <h1 className="monoalphabetic-title">Monoalphabetic Cipher</h1>
      <div className="monoalphabetic-input-container">
        <label className="monoalphabetic-label">Enter Plain Text:</label>
        <input
          type="text"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          className="monoalphabetic-input"
        />
      </div>

      <div className="monoalphabetic-input-container">
        <label className="monoalphabetic-label">Enter Key:</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="monoalphabetic-input"
        />
      </div>

      <button onClick={encryptMonoalphabetic} className="monoalphabetic-button">
        Encrypt
      </button>

      <div className="monoalphabetic-result">
        Cipher text: {cipherText}
      </div>
    </div>
  );
};

export default MonoalphabeticCipher;
