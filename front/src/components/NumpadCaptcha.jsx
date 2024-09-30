import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faHeadphones, faRefresh, faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './NumpadCaptcha.module.css';
import blank from '../../assets/blank.png';

export function NumpadCaptcha({ onSubmit }) {
  const [captchaData, setCaptchaData] = useState({ answer: null, image: blank });
  const [captchaInput, setCaptchaInput] = useState('');

  async function fetchCaptcha() {
    let res = await fetch('http://localhost:8000/captcha_image/', { method: 'GET' });
    res = await res.json();

    setCaptchaData({
      image: res['image'],
      answer: res['answer']
    });
  }

  useEffect(() => {
    fetchCaptcha().catch(console.error);
  }, []);

  function handleRefreshClicked() {
    fetchCaptcha().catch(console.error);
    setCaptchaInput('');
  };

  function handleAudioClicked() {
    alert('the audio task in under work!');
  };

  function handleNumberClicked(event) {
    setCaptchaInput(captchaInput + event.target.innerText);
  }

  function handleClearClicked() {
    setCaptchaInput('');
  };

  function handleSubmitClicked() {
    onSubmit(captchaInput === captchaData.answer);
    if (captchaInput !== captchaData.answer) {
      fetchCaptcha().catch(console.error);
      setCaptchaInput('');
    }
  };

  return (
    <div className={styles.formDiv}>
      <div className={styles.leftDiv}>
        <p className={styles.instructionText}><strong>Enter the number below</strong></p>
        <img className={styles.captchaImg} src={captchaData.image} />
        <div className={styles.controlsDiv}>
          <button className={styles.coloredBtn} onClick={handleAudioClicked}>
            <FontAwesomeIcon icon={faHeadphones} /> Audio
          </button>
          <div className={styles.spacer} />
          <button className={styles.coloredBtn} onClick={handleRefreshClicked}>
            <FontAwesomeIcon icon={faRefresh} /> Refresh
          </button>
        </div>
      </div>
      <div className={styles.spacer} />
      <div className={styles.rightDiv}>
        <input className={styles.captchaInp} placeholder='Enter Number'
          value={captchaInput} readOnly={true} type='text' pattern='\d+' name='captcha' />
        <div className={styles.spacer} />
        <div className={styles.numbersDiv}>
          <button className={styles.numberBtn} onClick={handleNumberClicked}>1</button>
          <button className={styles.numberBtn} onClick={handleNumberClicked}>2</button>
          <button className={styles.numberBtn} onClick={handleNumberClicked}>3</button>
          <button className={styles.numberBtn} onClick={handleNumberClicked}>4</button>
          <button className={styles.numberBtn} onClick={handleNumberClicked}>5</button>
          <button className={styles.numberBtn} onClick={handleNumberClicked}>6</button>
          <button className={styles.numberBtn} onClick={handleNumberClicked}>7</button>
          <button className={styles.numberBtn} onClick={handleNumberClicked}>8</button>
          <button className={styles.numberBtn} onClick={handleNumberClicked}>9</button>
          <button className={styles.numberBtn} onClick={handleClearClicked}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <button className={styles.numberBtn} onClick={handleNumberClicked}>0</button>
          <button className={styles.numberBtn} onClick={handleSubmitClicked}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      </div>
    </div>
  );
}
