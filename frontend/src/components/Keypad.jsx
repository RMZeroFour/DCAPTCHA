import React, { useState } from 'react';
import './keypad.css'; 

const Keypad = () => {
  const [input, setInput] = useState('');

  
  const handleClick = (value) => {
    setInput(value);
  };

  // Function to Submit value entered by user
  const submitData = ()=> {
      console.log("Data Submit : " + input)
  }

  return (
    <div>
    
    <div className="numpad-container">
      {/* Display Screen */}
      <div className="screen">{input}</div>

      {/* Numpad Buttons */}
      <div className="numpad-buttons">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
          <button key={num}  className='numpad-btn' onClick={() => handleClick(num)}>
            {num}
          </button>
        ))}
      </div>
    </div>
    
    <div className='submit-btn'>
        <button className='btn' type='button' onClick={submitData}>Submit</button>
    </div>
</div>
  );
};

export default Keypad;
