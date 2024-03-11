import React, { useState } from 'react';
import './polyalphabetic.css'; // Import your CSS file for styling

const PolyalphabeticCipher = () => {
  const [plaintext, setPlaintext] = useState('');
  const [key, setKey] = useState('');
  const [cipherText, setCipherText] = useState('');

  const encryptPolyalphabetic = () => {
    let data = plaintext.toUpperCase();
    let keyUpper = key.toUpperCase();
    let result = "";

    for (let i = 0, j = 0; i < data.length; i++) {
      if (data[i] >= 'A' && data[i] <= 'Z') {
        result += String.fromCharCode(
          (data[i].charCodeAt() + keyUpper[j].charCodeAt() - 2 * 'A'.charCodeAt()) % 26 + 'A'.charCodeAt()
        );
        j = (j + 1) % keyUpper.length;
      } else {
        result += data[i];
      }
    }

    setCipherText(result);
  };

  return (
    <div className="polyalphabetic-container">
      <h1 className="polyalphabetic-title">Polyalphabetic Cipher</h1>
      <div className="polyalphabetic-input-container">
        <label className="polyalphabetic-label">Enter Plain Text:</label>
        <input
          type="text"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          className="polyalphabetic-input"
        />
      </div>

      <div className="polyalphabetic-input-container">
        <label className="polyalphabetic-label">Enter Key:</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="polyalphabetic-input"
        />
      </div>

      <button onClick={encryptPolyalphabetic} className="polyalphabetic-button">
        Encrypt
      </button>

      <div className="polyalphabetic-result">
        Cipher text: {cipherText}
      </div>
    </div>
  );
};

export default PolyalphabeticCipher;
