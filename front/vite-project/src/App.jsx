import { useState } from 'react';
import './App.css'; 



function App() {
  const [showKeypad, setShowKeypad] = useState(false);
  const [input, setInput] = useState('');
  const Keypad = ({ onClick }) => {
    const keys = [
      '1', '2', '3',
      '4', '5', '6',
      '7', '8', '9','0'
    ];
  
    return (
      
      <div className="keypad">
        
        {keys.map((key) => (
          <button 
            key={key} 
            className="keypad-button" 
            onClick={() => onClick(key)}
          >
            {key}
          </button>
        
        ))}
        <div className='generated-number'>
              <label className="form-section__label">Enter the given number</label>
                <input 
                  name="num" 
                  autoComplete="off" 
                  className="form-section__input" 
                  value={input}
                  readOnly 
                />
          </div>
        <div className="random-number-box">
          {Math.floor(Math.random() * 10)}
        </div>
      </div>
    );
  };
  const handleKeyClick = (key) => {
    setInput(prevInput => prevInput + key);
  };

  function safeCAPTCHA() {
    setShowKeypad(prev => !prev);
  }

  return (
    <div className="login-section">
      <div className="login-section__card">
        <form>
          <div className="form-section">
            <div className="form-section__text-field">
              <label className="form-section__label">Enter Aadhaar Number</label>
              <input 
                name="uid" 
                autoComplete="off" 
                className="form-section__input" 
              />
            </div>
            
            <div className="form-section__button-container">
              <button 
                type="button" 
                className="form-section__button"
                onClick={safeCAPTCHA}
              >
                {showKeypad ? 'Hide Keypad' : 'Sign in With Safe CAPTCHA'}
              </button>
            </div>
          </div>
        </form>
        {showKeypad && <Keypad onClick={handleKeyClick} />}
      </div>
    </div>
  );
}

export default App;
