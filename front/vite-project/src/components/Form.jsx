import React, { useState, useEffect, useRef } from "react";
import "../index.css"
import Numpad from "./Numpad";
const Form = () => {
  const [totalDistance, setTotalDistance] = useState(0);
  const startPosition = useRef(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const startTime = useRef(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;

      if (startPosition.current) {
        if (lastPosition.current.x !== 0 || lastPosition.current.y !== 0) {
          const dx = clientX - lastPosition.current.x;
          const dy = clientY - lastPosition.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          setTotalDistance(prevDistance => prevDistance + distance);
        }
      }
      lastPosition.current = { x: clientX, y: clientY };
    };

    const handleLoad = () => {
      startPosition.current = { x: lastPosition.current.x, y: lastPosition.current.y };
      startTime.current = Date.now();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('load', handleLoad);
  }, []);

  const handleSignInClick = () => {
      const timeTaken = Date.now() - startTime.current;
      console.log('Distance from Start to Click:', totalDistance.toFixed(2));
      console.log('Time Taken (in s):', timeTaken / 1000);
    }
  
    const typingStart = useRef(null);

    useEffect(() => {
      if (input.length === 0) 
      {
        typingStart.current = null;
        return;
      }
  
      if (!typingStart.current) 
        typingStart.current = new Date().getTime();
     
      else 
      {
        const typingEnd = new Date().getTime();
        const timeTaken = (typingEnd - typingStart.current) / 1000; 
        const speed = input.length / timeTaken; 
        console.log('Typing Speed:', speed.toFixed(2), 'chars/s');
      }
    }, [input]);
    
    const handleInputChange = (e) => {
      setInput(e.target.value);
    };

  const [numpad,setNumpad]=useState(null);
    return (
    <>
      <div className="login">
        <div className="login-desc">Login to Aadhar</div>
        
        <div className="login-card">
        
         { <div >
           <form className="formX" >
             <input className="place" placeholder="Enter Aadhar Number" type="text" pattern="[0-9]*" name="aadhar" onChange={handleInputChange} />
           </form>
          </div>}
          

          {numpad ? <Numpad/> : (<div className="btn-container">
            <button onClick={ ()=>{
              setNumpad(true);
              handleSignInClick();
            }} className="submit-button" type="button">Verify as Human </button>
          </div>)
         }

        
        </div>
         
         
      </div>
    </>)
}
export default Form;