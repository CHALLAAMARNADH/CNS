import React, { useState } from 'react';
import "./content.css";
import { Button, Dropdown } from 'antd';
import { CaesarEncrypt,CaesarDecrypt, generateRandomKey, MonoEncrypt, MonoDecrypt, PolyEncrypt, PolyDecrypt, HillDecrypt, HillEncrypt, DESEncrypt, DESDecrypt, AESDecrypt, AESEncrypt, RSADecrypt, RSAEncrypt, generateKeys, DHSharedKey, MD5Hash, SHA1Hash } from './crypto';



const items = [
    {
      key: '1',
      label: (
          "Ceaser Cipher"
        
      ),
    },
    {
      key: '2',
      label: (
          "Monoalphabetic Cipher"
        
      ),
    },
    {
      key: '3',
      label: (
         " Vegenere Cipher"
        
      ),
    },
    {
        key: '4',
        label: (

           " Hill Cipher"
          
        ),
      },
      {
        key: '5',
        label: (

           " DES Algorithm"
          
        ),
      },
      {
        key: '6',
        label: (

           " AES Algorithm"
          
        ),
      },
      {
        key: '7',
        label: (

           " RSA Algorithm"
          
        ),
      },
      {
        key: '8',
        label: (

            "Diffie- Hellman Algorithm"
          
        ),
      },
      {
        key: '9',
        name:'SHA1',
        label: (
        //
            "SHA-1"
        //   
        ),
      },
      {
        key: '10',
        label: (

            "MD5"
          
        ),
      },
  ];


const Encryption = () => {
    const [key,setKey ] = useState("1")
    const onClick =({key,name})=>{
     setKey(key)
    }
    
    const [outputKeys, setOutputKeys] = useState('');

    const [enInputText, onChangeEnInputText] = useState('');
    const [enInputKey, onChangeEnInputKey] = useState("");
    const [enOutputText, setEnOutputText] = useState('');

    const [deInputText, onChangeDeInputText] = useState('');
    const [deInputKey, onChangeDeInputKey] = useState("");
    const [deOutputText, setDeOutputText] = useState('');

    const [randomKey, onChangerandomKey] = useState('');
    const [p,onChangeP] = useState('');
    const [q,onChangeQ] = useState('');
    const [kA,setKa] = useState('');
    const [kB,setKb] = useState('');
    const [n,onChangeN] = useState('');
    const [ed,onChangeED] = useState('');

    function arePrimes(p, q) {
      const isPrime = (num) => {
        if (num <= 1) {
          return false;
        }
        for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) {
            return false;
          }
        }
        return true;
      };
        if(!isPrime(p)){
          alert(`${p} is not prime`);
          return false;
        }
        else if(!isPrime(q)){
          alert(`${q} is not prime`);
          return false;
        }
      return true;
    }

    const GenerateKeys =()=>{
      if(!p ||!q || p<11 || q<13) {
        alert("Please input primes p>10 and q>12");
      }else if(arePrimes(p,q)){
        const { publicKey, privateKey } = generateKeys(p, q);
    const publicKeyString = `Public Key: {${JSON.stringify(publicKey.n)}, ${JSON.stringify(publicKey.e)}}`;
    const privateKeyString =` Private Key: {${JSON.stringify(privateKey.n)}, ${JSON.stringify(privateKey.d)}}`;
    const combinedKeys =` ${publicKeyString}\n${privateKeyString}`;
        setOutputKeys(combinedKeys);
      }
    }
    const Encrypt = async () => {
    let res;
      switch (key) {
        case "1":
          res=  await CaesarEncrypt(enInputText,enInputKey);
          break;

          case "4":
              if(!enInputKey || enInputKey.length <9 || enInputKey.length >9) {
                alert("Please input a key of length 9");
              }else{
                res=  await HillEncrypt(enInputText.toUpperCase(),enInputKey.toUpperCase());
              }
              break;
         case "2":
           if(!randomKey) {
             alert("Please generate a random key");
           }else{

             res=  await MonoEncrypt(enInputText,randomKey);
           }
           break;

         case "3":
           if(!enInputKey) {
             alert("Please input a key");
           }else{

             res=  await PolyEncrypt(enInputText.toUpperCase(),enInputKey.toUpperCase());
           }
           break;

        // case "PlayFair Cipher":
        //   if(!inputKey) {
        //     alert("Please input a key");
        //   }
        //   else{

        //     res=  await PlayfairEncrypt(inputText.toUpperCase(),inputKey.toUpperCase());
        //   }
        //   break;

         case "5":
           if(!enInputKey) {
             alert("Please input a key");
           }else{

             res=  await DESEncrypt(enInputText,enInputKey);
           }
           break;

        case "6":
          if(!enInputKey) {
            alert("Please input a key");
          }else{

            res=  await AESEncrypt(enInputText,enInputKey);
          }
          break;

        case "7":
          if(!n || !ed) {
            alert("Please input the key");
          }else{

            res=  await RSAEncrypt(enInputText,n,ed);
          }
          break;

         case "8":
           if(!p || !q || !n || !ed) {
             alert("Please input the keys");
           }else  {

             const [ka,kb,sharedKey] = await DHSharedKey(p,q,n,ed);
             setKa(ka);
             setKb(kb);
             res=sharedKey;
           }
           break;

          case "10":
            res= await MD5Hash(enInputText);
            console.log("Hello")
          break;

          case "9":
            res= await SHA1Hash(enInputText);
          break;

        default: console.log("Check Algorithm Name")
          break;
      }

      setEnOutputText(res);

    };

     const Decrypt = async () => {
       let res;
         switch (key) {
           case "1":
             res=  await CaesarDecrypt(deInputText,deInputKey);
             break;

             case "4":
               if(!deInputKey || deInputKey.length <9 || deInputKey.length >9) {
                 alert("Please input a key of length 9");
               }else{
                 res=  await HillDecrypt(deInputText.toUpperCase(),deInputKey.toUpperCase());
               }
               break;

             case "2":
               if(!randomKey) {
                 alert("Please generate a random key");
               }else{
                 res=  await MonoDecrypt(deInputText.toUpperCase(),randomKey);
               }
               break;

               case "3":
               if(!deInputKey) {
                 alert("Please input a  key");
               }else{

                 res=  await PolyDecrypt(deInputText.toUpperCase(),deInputKey.toUpperCase());
               }
               break;



              case "5":
              if(!deInputKey) {
                alert("Please input a  key");
              }else{

                res=  await DESDecrypt(deInputText,deInputKey);
              }
              break;

              case "6":
              if(!deInputKey) {
                alert("Please input a  key");
              }else{

                res=  await AESDecrypt(deInputText,deInputKey);
              }
              break;

              case "7":
                if(!n || !ed) {
                  alert("Please input the key");
                }else{

                  res=  await RSADecrypt(deInputText,n,ed);
                }
                break;

               default: console.log("Check Algorithm Name")
                 break;
         }

         setDeOutputText(res);

       };
  return (
    <div className='encrypt'>
        <div style={{display:'flex',justifyContent:"space-between"}}>
      <div className='Crypt'>Cryptogrphic Algorithms</div>
      <div className='dropdown'>
      <Dropdown
        menu={{
          items,
          onClick
        }}
        placement="bottomRight"
      >
        <Button>Select Algorithm</Button>
      </Dropdown>
      </div></div>


     {key==='1' && <>
     <div className='paraContainer'><p className='para'>Ceaser Cipher</p></div>
     <div className='container'>
     <div className="division">
    <span className='Crypt1'>Encryption</span><br/><br/>
    <label>Enter Plain Text</label> <br/><br/>
    <input type='text' value={enInputText} onChange={(e)=>onChangeEnInputText(e.target.value)}/><br/><br/>
    <label>Enter Key</label> <br/><br/>
    <input type='number' value={enInputKey} onChange={(e)=>onChangeEnInputKey(e.target.value)}/><br/><br/>
    <label>Cipher Text</label> <br/><br/>
    <input value={enOutputText}/><br/><br/>
    <Button type="primary" onClick={Encrypt}>Encrypt</Button>
  </div>
  <div className="division">
  <span className='Crypt1'>Decryption</span><br/><br/>
  <label>Enter Cipher Text</label> <br/><br/>
    <input type='text' value={deInputText} onChange={(e)=>onChangeDeInputText(e.target.value)}/><br/><br/>
    <label>Enter Key</label> <br/><br/>
    <input type='number' value={deInputKey} onChange={(e)=>onChangeDeInputKey(e.target.value)}/><br/><br/>
    <label>Plain Text</label><br/><br/>
    <input value={deOutputText}/><br/><br/>
    <Button type="primary" onClick={Decrypt}>Decrypt</Button>
  </div>
  </div></>}

  {key==='2' && <>
     <div className='paraContainer'><p className='para'>Monoalphabetic Cipher</p></div>
     <div className='container'>
     <div className="division">
    <span className='Crypt1'>Encryption</span><br/><br/>
    <label>Enter Plain Text</label> <br/><br/>
    <input type='text' value={enInputText} onChange={(e)=>onChangeEnInputText(e.target.value)}/><br/><br/>
    <label>Generate Random Key</label> <br/><br/>
    <input type='text' value={randomKey}/><br/><br/>
    <Button type="primary" onClick={()=>onChangerandomKey(generateRandomKey)}>Generate Random Key</Button><br/><br/>
    <label>Cipher Text</label> <br/><br/>
    <input value={enOutputText}/><br/><br/>
    <Button type="primary" onClick={Encrypt}>Encrypt</Button>
  </div>
  <div className="division">
  <span className='Crypt1'>Decryption</span><br/><br/>
  <label>Enter Cipher Text</label> <br/><br/>
    <input type='text' value={deInputText} onChange={(e)=>onChangeDeInputText(e.target.value)}/><br/><br/>
    <label>Enter Key</label> <br/><br/>
    <input type='text' value={randomKey}/><br/><br/>
    <label>Plain Text</label><br/><br/>
    <input value={deOutputText}/><br/><br/>
    <Button type="primary" onClick={Decrypt}>Decrypt</Button>
  </div>
  </div></>}


  {key==='3' && <>
     <div className='paraContainer'><p className='para'>Vegenere Cipher</p></div>
     <div className='container'>
     <div className="division">
    <span className='Crypt1'>Encryption</span><br/><br/>
    <label>Enter Plain Text</label> <br/><br/>
    <input type='text' value={enInputText} onChange={(e)=>onChangeEnInputText(e.target.value)}/><br/><br/>
    <label>Enter Key</label> <br/><br/>
    <input type='text' value={enInputKey} onChange={(e)=>onChangeEnInputKey(e.target.value)}/><br/><br/>
    <label>Cipher Text</label> <br/><br/>
    <input value={enOutputText}/><br/><br/>
    <Button type="primary" onClick={Encrypt}>Encrypt</Button>
  </div>
  <div className="division">
  <span className='Crypt1'>Decryption</span><br/><br/>
  <label>Enter Cipher Text</label> <br/><br/>
    <input type='text' value={deInputText} onChange={(e)=>onChangeDeInputText(e.target.value)}/><br/><br/>
    <label>Enter Key</label> <br/><br/>
    <input type='text' value={deInputKey} onChange={(e)=>onChangeDeInputKey(e.target.value)}/><br/><br/>
    <label>Plain Text</label><br/><br/>
    <input value={deOutputText}/><br/><br/>
    <Button type="primary" onClick={Decrypt}>Decrypt</Button>
  </div>
  </div></>}


  {key==='4' && <>
     <div className='paraContainer'><p className='para'>Hill Cipher</p></div>
     <div className='container'>
     <div className="division">
    <span className='Crypt1'>Encryption</span><br/><br/>
    <label>Enter Plain Text</label> <br/><br/>
    <input type='text' value={enInputText} onChange={(e)=>onChangeEnInputText(e.target.value)}/><br/><br/>
    <label>Enter Key</label> <br/><br/>
    <input type='text' value={enInputKey} onChange={(e)=>onChangeEnInputKey(e.target.value)}/><br/><br/>
    <label>Cipher Text</label> <br/><br/>
    <input value={enOutputText}/><br/><br/>
    <Button type="primary" onClick={Encrypt}>Encrypt</Button>
  </div>
  <div className="division">
  <span className='Crypt1'>Decryption</span><br/><br/>
  <label>Enter Cipher Text</label> <br/><br/>
    <input type='text' value={deInputText} onChange={(e)=>onChangeDeInputText(e.target.value)}/><br/><br/>
    <label>Enter Key</label> <br/><br/>
    <input type='text' value={deInputKey} onChange={(e)=>onChangeDeInputKey(e.target.value)}/><br/><br/>
    <label>Plain Text</label><br/><br/>
    <input value={deOutputText}/><br/><br/>
    <Button type="primary" onClick={Decrypt}>Decrypt</Button>
  </div>
  </div></>}


  {key==='5' && <>
     <div className='paraContainer'><p className='para'>DES Algorithm</p></div>
     <div className='container'>
     <div className="division">
    <span className='Crypt1'>Encryption</span><br/><br/>
    <label>Enter Plain Text</label> <br/><br/>
    <input type='text' value={enInputText} onChange={(e)=>onChangeEnInputText(e.target.value)}/><br/><br/>
    <label>Enter Key</label> <br/><br/>
    <input type='text' value={enInputKey} onChange={(e)=>onChangeEnInputKey(e.target.value)}/><br/><br/>
    <label>Cipher Text</label> <br/><br/>
    <input value={enOutputText}/><br/><br/>
    <Button type="primary" onClick={Encrypt}>Encrypt</Button>
  </div>
  <div className="division">
  <span className='Crypt1'>Decryption</span><br/><br/>
  <label>Enter Cipher Text</label> <br/><br/>
    <input type='text' value={deInputText} onChange={(e)=>onChangeDeInputText(e.target.value)}/><br/><br/>
    <label>Enter Key</label> <br/><br/>
    <input type='text' value={deInputKey} onChange={(e)=>onChangeDeInputKey(e.target.value)}/><br/><br/>
    <label>Plain Text</label><br/><br/>
    <input value={deOutputText}/><br/><br/>
    <Button type="primary" onClick={Decrypt}>Decrypt</Button>
  </div>
  </div></>}


  {key==='6' && <>
     <div className='paraContainer'><p className='para'>AES Algorithm</p></div>
     <div className='container'>
     <div className="division">
    <span className='Crypt1'>Encryption</span><br/><br/>
    <label>Enter Plain Text</label> <br/><br/>
    <input type='text' value={enInputText} onChange={(e)=>onChangeEnInputText(e.target.value)}/><br/><br/>
    <label>Enter Key</label> <br/><br/>
    <input type='text' value={enInputKey} onChange={(e)=>onChangeEnInputKey(e.target.value)}/><br/><br/>
    <label>Cipher Text</label> <br/><br/>
    <input value={enOutputText}/><br/><br/>
    <Button type="primary" onClick={Encrypt}>Encrypt</Button>
  </div>
  <div className="division">
  <span className='Crypt1'>Decryption</span><br/><br/>
  <label>Enter Cipher Text</label> <br/><br/>
    <input type='text' value={deInputText} onChange={(e)=>onChangeDeInputText(e.target.value)}/><br/><br/>
    <label>Enter Key</label> <br/><br/>
    <input type='text' value={deInputKey} onChange={(e)=>onChangeDeInputKey(e.target.value)}/><br/><br/>
    <label>Plain Text</label><br/><br/>
    <input value={deOutputText}/><br/><br/>
    <Button type="primary" onClick={Decrypt}>Decrypt</Button>
  </div>
  </div></>}


  {key==='7' && <>
     <div className='paraContainer'><p className='para'>RSA Algorithm</p></div>
     <div className='container'>
     <div className="division">
    <span className='Crypt1'>Encryption</span><br/><br/>
    <label>Enter Input Prime 1</label> <br/><br/>
    <input type='text' value={p} onChange={(e)=>onChangeP(e.target.value)}/><br/><br/>
    <label>Enter Input Prime 2</label> <br/><br/>
    <input type="text" value={q} onChange={(e)=>onChangeQ(e.target.value)}/><br/><br/>
    <label>Keys:</label><br/><br/>
    <textarea value={outputKeys}/><br/><br/>
    <Button type="primary" onClick={GenerateKeys}>Generate Keys</Button>
  </div>
  <div className='division'>
    <label>Enter Plain Text</label> <br/><br/>
    <input type='text' value={enInputText} onChange={(e)=>onChangeEnInputText(e.target.value)}/><br/><br/>
    <label>Enter Public Key</label><br/><br/>
    <div style={{display:"block",justifyContent:"center",alignItems:"center"}}>
        <input placeholder='n' type='text' value={n} onChange={(e)=>onChangeN(e.target.value)}/><br/><br/>
        <input placeholder='e/d' type='text' value={ed} onChange={(e)=>onChangeED(e.target.value)}/>
    </div><br/><br/>
    <Button type="primary" onClick={Encrypt}>Encrypt</Button>
    <br/><br/>
    <label>Cipher Text</label><br/><br/>
    <input value={enOutputText} /><br/>

  </div>
  <div className="division">
  <span className='Crypt1'>Decryption</span><br/><br/>
  <label>Enter Cipher Text</label> <br/><br/>
    <input type='text' value={deInputText} onChange={(e)=>onChangeDeInputText(e.target.value)}/><br/><br/>
    <label>Enter Private Key</label><br/><br/>
    <div style={{display:"block",justifyContent:"center",alignItems:"center"}}>
        <input placeholder='n' type='text' value={n} onChange={(e)=>onChangeN(e.target.value)}/><br/><br/>
        <input placeholder='e/d' type='text' value={ed} onChange={(e)=>onChangeED(e.target.value)}/>
    </div><br/>
    <label>Plain Text</label><br/><br/>
    <input value={deOutputText}/><br/><br/>
    <Button type="primary" onClick={Decrypt}>Decrypt</Button>
  </div>
  </div></>}


  {key==="8"  && <>
     <div className='paraContainer'><p className='para'>Diffie Hellman Algorithm</p></div> <div className='container'>
      <div className="division">
    <label>Enter Public Key for A</label> <br/><br/>
    <input type='text' value={p} onChange={(e)=>onChangeP(e.target.value)}/><br/><br/>
    <label>Enter Public Key for B</label> <br/><br/>
    <input type="text" value={q} onChange={(e)=>onChangeQ(e.target.value)}/><br/><br/>
  </div>
  <div className="division">
  <label>Enter Private Key for A</label> <br/><br/>
    <input type='text' value={n} onChange={(e)=>onChangeN(e.target.value)}/><br/><br/>
    <label>Enter Private Key for B</label> <br/><br/>
    <input type="text" value={ed} onChange={(e)=>onChangeED(e.target.value)}/><br/><br/>
    <Button type="primary" onClick={Encrypt}>Submit</Button>
  </div>
  <div className='division'>
    <label>Shared Key</label><br/><br/>
    <textarea value={enOutputText}/>
  </div>
  </div></>}


  {key==="9"  && <>
     <div className='paraContainer'><p className='para'>SHA-1</p></div> <div className='container'>
      <div className="division">
    <label>Enter Plain Text</label> <br/><br/>
    <input type='text' value={enInputText} onChange={(e)=>onChangeEnInputText(e.target.value)}/><br/><br/>
    <label>Hash Function</label> <br/><br/>
    <input type='text' value={enOutputText}/><br/><br/>
    <Button type="primary" onClick={Encrypt}>Submit</Button>
  </div>
  {/* <div className="division">
  <span className='Crypt1'>Decryption</span><br/><br/>
  <label>Enter Cipher Text</label> <br/><br/>
    <input/><br/><br/>
    <label>Plain Text</label> <br/><br/>
    <input/><br/><br/>
    <Button type="primary">Decrypt</Button>
  </div> */}
  </div> </>}


  {key==="10"  && <>
     <div className='paraContainer'><p className='para'>MD-5</p></div> <div className='container'>
      <div className="division">
    <label>Enter Plain Text</label> <br/><br/>
    <input type='text' value={enInputText} onChange={(e)=>onChangeEnInputText(e.target.value)}/><br/><br/>
    <label>Hash Function</label> <br/><br/>
    <input type='text' value={enOutputText}/><br/><br/>
    <Button type="primary" onClick={Encrypt}>Submit</Button>
  </div>
  
  </div> </>}


    </div>
  )
}

export default Encryption;
