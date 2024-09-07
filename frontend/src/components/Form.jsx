import React, { useState } from "react";
import "../index.css"
import Numpad from "./Numpad";
const Form = () => {
  const [numpad,setNumpad]=useState(null);
    return (
    <>
      <div className="login">
        <div className="login-desc">Login to Aadhar via OTP </div>
        
        <div className="login-card">
        
         { <div >
           <form className="formX" >
             <input className="place" placeholder="Enter Aadhar Number" type="text" pattern="[0-9]*" name="aadhar" />
           </form>
          </div>}
          

          {numpad ? <Numpad/> : (<div className="btn-container">
            <button onClick={ ()=>{
              setNumpad(true);
            }} className="submit-button" type="button">Verify as Human </button>
          </div>)
         }
         
        
        </div>
         
         
      </div>
    </>)
}
export default Form;