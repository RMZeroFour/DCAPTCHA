import React, { useEffect, useState } from "react";
import "../index.css";
import Keypad from "./Keypad";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Numpad = (input) => {
    const [screenValue, setScreenValue] = useState('');
    const [captchaImage, setCaptchaImage] = useState(null);
    const [ans, setAns] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/captcha_image/');
            const image = response.data.image;
            const answer = response.data.answer;
            setCaptchaImage(image);
            setAns(answer);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const handleSubmit = (input) => {
        if (input === ans) {
            alert('Correct Answer!');
            navigate('/home');

        } else {
            alert('Incorrect Answer. Try again.');
            console.log(ans, typeof(ans), input, typeof(screenValue));
            fetchData();
        }
    }

    useEffect(() => {
        fetchData(); 
    }, []);

    return (
        <div className="numpad">
            <div className="numpad-left">
                <p>Enter the given number:</p>
                <div className="num-box">
                    
                <img height={100} width={180} src = {captchaImage}/>
                </div>
                <div className='submit-btn'>
                <button className='btn' type='button' onClick={fetchData}>Refresh</button>
            </div>
            </div>

            <div className="numpad-right">
                <Keypad screenValue={screenValue} handleSubmit = {handleSubmit}/>
            </div>
            
        </div>
    );
};

export default Numpad;
