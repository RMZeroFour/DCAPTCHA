import React, { useState } from 'react';
import './keypad.css'; 

const Keypad = ({ screenValue, refresh }) => {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
  };

  return (
    <div>
      <div className="numpad-container">
        <div className="numpad-buttons">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button key={num} onClick={() => handleClick(num)}>
              {num}
            </button>
          ))}
        </div>
      </div>
    
      <div className='submit-btn'>
        <button className='btn' type='button' onClick={refresh}>Refresh</button>
        <button className='btn' type='button'>Mic</button>
      </div>
    </div>
  );
};

export default Keypad;
