import React, { useState } from 'react';
import './caesarcipher.css'; // Import your CSS file for styling

const CaesarCipher = () => {
  const [plaintext, setPlaintext] = useState('');
  const [key, setKey] = useState('');
  const [cipherText, setCipherText] = useState('');

  const encryptCaesar = () => {
    let data = plaintext;
    let shift = Number(key);
    let result = "";

    for (let i = 0; i < data.length; i++) {
      if (data[i] >= 'A' && data[i] <= 'Z') {
        result += String.fromCharCode(((data[i].charCodeAt() - 'A'.charCodeAt() + shift) % 26) + 'A'.charCodeAt());
      } else if (data[i] >= 'a' && data[i] <= 'z') {
        result += String.fromCharCode(((data[i].charCodeAt() - 'a'.charCodeAt() + shift) % 26) + 'a'.charCodeAt());
      } else {
        result += data[i];
      }
    }

    setCipherText(result);
  };

  return (
    <div className="caesar-container">
      <h1 className="caesar-title">Caesar Cipher</h1>
      <div className="caesar-input-container">
        <label className="caesar-label">Enter Plain Text:</label>
        <input
          type="text"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          className="caesar-input"
        />
      </div>

      <div className="caesar-input-container">
        <label className="caesar-label">Enter Key:</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="caesar-input"
        />
      </div>

      <button onClick={encryptCaesar} className="caesar-button">
        Encrypt
      </button>

      <div className="caesar-result">
        Cipher text: {cipherText}
      </div>
    </div>
  );
};

export default CaesarCipher;
