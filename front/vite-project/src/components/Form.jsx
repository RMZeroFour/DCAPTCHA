import React, { useState, useEffect, useRef } from "react";
import "../index.css";
import Numpad from "./Numpad";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = () => {
    const [time_taken, setTime_taken] = useState(0);
    const [typing_speed, setTyping_speed] = useState(0);
    const [mouse_movement, setMouse_movement] = useState(0.69);
    const [mouse_distance, setMouse_distance] = useState(0);
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [is_proxy, setIs_proxy] = useState(false);
    const [numpad, setNumpad] = useState(null);
    const [input, setInput] = useState('');
    const typingStart = useRef(null);
    const typingTimer = useRef(null);  
    const navigate = useNavigate();

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
                setCity('Delhi');
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

    useEffect(() => {
       startTime.current = Date.now();
    }, []);

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

	startPosition.current = { x: lastPosition.current.x, y: lastPosition.current.y };
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleSignInClick = () => {
        const timeTaken = Date.now() - startTime.current;
        console.log('Distance from Start to Click:', totalDistance.toFixed(2));
        setMouse_distance(totalDistance.toFixed(2));
        console.log('Time Taken (in s):', timeTaken / 1000);
        setTime_taken(timeTaken / 1000);
    };

    useEffect(() => {
        if (input.length === 0) {
            typingStart.current = null;
            return;
        }

        if (!typingStart.current) {
            typingStart.current = new Date().getTime();
        } else {
            if (typingTimer.current) {
                clearTimeout(typingTimer.current);
            }

            typingTimer.current = setTimeout(() => {
                const typingEnd = new Date().getTime();
                const timeTaken = (typingEnd - typingStart.current) / 1000;
                const speed = input.length / timeTaken;
                console.log('Typing Speed:', speed.toFixed(2), 'chars/s');
                setTyping_speed(speed.toFixed(2));
            }, 500); 
        }

        return () => {
            if (typingTimer.current) {
                clearTimeout(typingTimer.current);
            }
        };
    }, [input]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const postdata = async () => {
        try {
            const response = await axios.post('https://dcaptcha.onrender.com/predict', {
                time_taken,
                typing_speed,
                mouse_movement,
                mouse_distance,
                country,
                city: 'Delhi',
                is_proxy 
            });
            console.log('POST Response:', response.data);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    useEffect(() => {
        if (time_taken && typing_speed && mouse_distance && country && city !== '') {
            postdata();
        }
    }, [time_taken, typing_speed, mouse_distance, mouse_movement, country, city, is_proxy]);

    const handleClick = async ()=>{
        const response = await axios.post('http://127.0.0.1:8000/predict/',
            {
                time_taken: Number(time_taken),
                typing_speed: Number(typing_speed),
                mouse_distance: Number(mouse_distance),
                country,
                city: 'Delhi',
                is_proxy : String(is_proxy)
            });
        console.log(response.data, typeof(response.data));
        if(response.data.result == "Bot")
        {
            alert('BOT DETECTED');        
        }
        else if(response.data.result == "Not Sure")
        {
            alert('Not Sure');
            setNumpad(true);
        }
        else if(response.data.result == "Human")
        {
            alert('Human detected');
            //setNumpad(true);
            navigate('/home');
        }
    }

    /*useEffect(() => {
            if (time_taken && typing_speed && mouse_distance && country && city !== '') {
                handleClick();
            }
        }, [time_taken, typing_speed, mouse_distance, country, city, is_proxy]);
*/
    return (
        <>
            <div className="login">
                <div className="login-desc">Login to Aadhar</div>
                <div className="login-card">
                    <div>
                        <form className="formX">
                            <input className="place" placeholder="Enter Aadhar Number" type="text" pattern="[0-9]*" name="aadhar" onChange={handleInputChange} />
                        </form>
                    </div>
                    {numpad ? <Numpad /> : (
                        <div className="btn-container">
                            <button onClick={() => {
                               // setNumpad(true);
                                handleSignInClick();
                                handleClick();
                            }} className="submit-button" type="button">Verify as Human</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Form;
