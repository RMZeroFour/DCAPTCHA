import React, { useState } from "react";
import "../index.css"
import Keypad from "./Keypad";
const Numpad = ()=> {
    // state variables to set the value entered by user from keypad
    const [screenValue,setScreenValue] = useState(5);
   
    return (
        <>
           <div className="numpad">
              <div className="numpad-left">
                <p>Enter the given number:</p>
                <div className="num-box">
                    <p>{Math.floor(Math.random() * 10)}</p>
                </div>
              </div>
              

              <div className="numpad-right">
                 <Keypad/>

              </div>
           </div>
        </>
    )

}
export default Numpad;