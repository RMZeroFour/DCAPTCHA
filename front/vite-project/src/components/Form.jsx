import React, { useState, useEffect, useRef } from "react";
import "../index.css"
import Numpad from "./Numpad";
import axios from "axios";

const Form = () => {
    const [time_taken, setTime_taken] = useState(0);
    const [typing_speed, setTyping_speed] = useState(0);
    const [mouse_movement, setMouse_movement] = useState(0.69);
    const [mouse_distance, setMouse_distance] = useState(0);
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [is_proxy, setIs_proxy] = useState(false);

  useEffect(() => {
    console.log('User Agent:', navigator.userAgent);
  }, []);

  useEffect(() => {
    fetch('https://api.ipapi.is/')
    .then(response => response.json())
    .then(data => {
        console.log('IP:', data.ip);
        console.log('Country:', data.location.country);
        setCountry(data.location.country); 
        console.log('City:', data.location.city);
        setCity(data.location.city);
        console.log('Coordinates:', { latitude: data.location.latitude, longitude: data.location.longitude });
        console.log('isProxy:', data.is_proxy);
        setIs_proxy(data.is_proxy);
    })
    .catch(error => console.error('Error fetching IP data:', error));
  }, []);
  
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
      setMouse_distance(totalDistance.toFixed(2));
      console.log('Time Taken (in s):', timeTaken / 1000);
      setTime_taken(timeTaken / 1000);
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
        setTyping_speed(speed.toFixed(2));
        console.log(time_taken);
      }
    }, [input]);
    
    const handleInputChange = (e) => {
      setInput(e.target.value);
    };

    const postdata = async () => {
      await axios.post('https://dcaptcha.onrender.com/predict', { time_taken, typing_speed, mouse_movement, mouse_distance, country, city, is_proxy});
      console.log({time_taken, typing_speed, mouse_movement, mouse_distance, country, city, is_proxy})
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
              postdata();
            }} className="submit-button" type="button">Verify as Human </button>
          </div>)
         }

        
        </div>
         
         
      </div>
    </>)
}
export default Form;