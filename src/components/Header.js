import React from 'react';
import Key from "../Assets/Key.jpg";
import "../components/Header.css";

const Header = () => {
  return (
    <div>
      <span className="header">
        Cryptography and Network Security
      </span>
      <img id="key" src={Key} alt="cybersecurity"/>
    </div>
  )
}

export default Header;
