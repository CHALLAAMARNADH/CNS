import React, { useState } from 'react';
import './polyfair.css'; 

const PlayfairCipher = () => {
  const [plaintext, setPlaintext] = useState('');
  const [key, setKey] = useState('');
  const [cipherText, setCipherText] = useState('');

  const prepare = (str, ptrs) => {
    let result = str.replace(/j/g, 'i');

    for (let i = 0; i < result.length - 1; i += 2) {
      if (result[i] === result[i + 1]) {
        result = result.slice(0, i + 1) + 'x' + result.slice(i + 1);
      }
    }

    if (result.length % 2 !== 0) {
      result += 'z';
    }

    return [result, result.length];
  };

  const generateKeyTable = (key, ks, keyT) => {
    let i, j, k;
    let dicty = new Array(26).fill(0);

    for (i = 0; i < ks; i++) {
      let r = key[i].charCodeAt(0) - 97;

      if (key[i] !== 'j') {
        dicty[r] = 2;
      }
    }

    dicty['j'.charCodeAt(0) - 97] = 1;
    i = 0;
    j = 0;

    for (k = 0; k < ks; k++) {
      let r = key[k].charCodeAt(0) - 97;
      if (dicty[r] === 2) {
        dicty[r] -= 1;
        keyT[i][j] = key[k];
        j++;
        if (j === 5) {
          i++;
          j = 0;
        }
      }
    }

    for (k = 0; k < 26; k++) {
      if (dicty[k] === 0) {
        keyT[i][j] = String.fromCharCode(k + 97);
        j++;
        if (j === 5) {
          i++;
          j = 0;
        }
      }
    }

    return keyT;
  };

  const search = (keyT, a, b, arr) => {
    let i, j;

    if (a === 'j') a = 'i';
    else if (b === 'j') b = 'i';

    for (i = 0; i < 5; i++) {
      for (j = 0; j < 5; j++) {
        if (keyT[i][j] === a) {
          arr[0] = i;
          arr[1] = j;
        } else if (keyT[i][j] === b) {
          arr[2] = i;
          arr[3] = j;
        }
      }
    }

    return arr;
  };

  const mod5 = (a) => {
    return (a % 5);
  };

  const encrypt = (str, keyT, ps) => {
    let i;
    let a = new Array(4).fill(0);
    let newstr = new Array(ps);

    for (i = 0; i < ps; i += 2) {
      let brr = search(keyT, str[i], str[i + 1], a);
      let k1 = brr[0];
      let k2 = brr[1];
      let k3 = brr[2];
      let k4 = brr[3];

      if (k1 === k3) {
        newstr[i] = keyT[k1][mod5((k2 + 1) % 5)];
        newstr[i + 1] = keyT[k1][mod5((k4 + 1) % 5)];
      } else if (k2 === k4) {
        newstr[i] = keyT[mod5((k1 + 1) % 5)][k2];
        newstr[i + 1] = keyT[mod5((k3 + 1) % 5)][k2];
      } else {
        newstr[i] = keyT[k1][k4];
        newstr[i + 1] = keyT[k3][k2];
      }
    }

    let res = "";

    for (let i = 0; i < newstr.length; i++) {
      res += newstr[i];
    }

    return res;
  };

  const encryptPlayfairCipher = () => {
    const str = plaintext.trim().toLowerCase();
    const keyStr = key.trim().toLowerCase();
    const ps = str.length;
    const ks = keyStr.length;
    const [preparedStr, newPs] = prepare(str, ps);
    const keyT = new Array(5).fill(0).map(() => new Array(5));

    generateKeyTable(keyStr, ks, keyT);
    const result = encrypt(preparedStr, keyT, newPs);

    setCipherText(result.toUpperCase());
  };

  return (
    <div className="playfair-container">
      <h1 className="title">Playfair Cipher</h1>
      <div className="input-container">
        <label className="label">Enter Plain Text:</label>
        <input
          type="text"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          className="input"
        />
      </div>

      <div className="input-container">
        <label className="label">Enter Key:</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="input"
        />
      </div>

      <button onClick={encryptPlayfairCipher} className="button">
        Encrypt
      </button>

      <div className="result-container">
        <div className="label">Cipher text:</div>
        <div className="result">{cipherText}</div>
      </div>
    </div>
  );
};

export default PlayfairCipher;
