import React, { useEffect, useState } from "react";
import "../index.css";
import Keypad from "./Keypad";

const Numpad = () => {
    const [screenValue, setScreenValue] = useState('');

    const refresh = () => {
        setScreenValue(Math.floor(Math.random() * (9 - 1 + 1)) + 1);
    };

    useEffect(() => {
        refresh(); 
    }, []);

    return (
        <div className="numpad">
            <div className="numpad-left">
                <p>Enter the given number:</p>
                <div className="num-box">
                    <p>{screenValue}</p>
                </div>
            </div>

            <div className="numpad-right">
                <Keypad screenValue={screenValue} refresh={refresh} />
            </div>
        </div>
    );
};

export default Numpad;
