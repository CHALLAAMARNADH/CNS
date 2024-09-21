import React from 'react';
import "./content.css";

const Content = () => {
  return (
    <div className='content'>
      <span className='Crypt'>What is Cryptography?</span>
      <br/><br/>
      <p>Cryptography is a method of protecting information and communications using codes, so that only those for whom the information is intended can read and process it.</p>
      <p>In computer science, cryptography refers to secure information and communication techniques derived from mathematical concepts and a set of rule-based calculations called algorithms, to transform messages in ways that are hard to decipher. These deterministic algorithms are used for cryptographic key generation, digital signing, verification to protect data privacy, web browsing on the internet and confidential communications such as credit card transactions and email.</p>
      <br/><br/>
      <span className='Crypt'>What is Network Security?</span>
      <br/><br/>
      <p>Network security is any activity designed to protect the usability and integrity of your network and data.</p>

      <p>It includes both hardware and software technologies</p>
        <p>It targets a variety of threats</p>
        <p>It stops them from entering or spreading on your network</p>
        <p>Effective network security manages access to the network</p>
        <br/><br/>
        <span className='Crypt'>Types of Cryptographic Algorithms</span>
        <p>In general there are 3 types of Cryptographic Algorithms</p>
        <br/>
        <span className='Crypt1'>Symmetric Key Cryptography</span>
        <p>It is an encryption system where the sender and receiver of message use a single common key to encrypt and decrypt messages. Symmetric Key Systems are faster and simpler but the problem is that sender and receiver have to somehow exchange key in a secure manner. The most popular symmetric key cryptography system are Data Encryption System(DES) and Advanced Encryption System(AES).</p>
        <br/>
        <span className='Crypt1'>Asymmetric Key Cryptography</span>
        <p>Under this system a pair of keys is used to encrypt and decrypt information. A receiver’s public key is used for encryption and a receiver’s private key is used for decryption. Public key and Private Key are different. Even if the public key is known by everyone the intended receiver can only decode it because he alone know his private key. The most popular asymmetric key cryptography algorithm is RSA algorithm.</p>
        <br/>
        <span className='Crypt1'>Hash Functions</span>
        <p>There is no usage of any key in this algorithm. A hash value with fixed length is calculated as per the plain text which makes it impossible for contents of plain text to be recovered. Many operating systems use hash functions to encrypt passwords.</p>
    </div>
  )
}

export default Content;

