import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faHeadphones, faRefresh, faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './NumpadCaptcha.module.css';

export function NumpadCaptcha({ onSubmit }) {
  const [captchaData, setCaptchaData] = useState({ answer: '478', image: 'data:image/png;base64,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' });
  const [captchaNumber, setCaptchaNumber] = useState('');

  function handleRefreshClicked() {
    setCaptchaNumber('');
  };

  function handleAudioClicked() {
    alert('the audio task in under work!');
  };

  function handleNumberClicked(event) {
    setCaptchaNumber(captchaNumber + event.target.innerText);
  }

  function handleClearClicked() {
    setCaptchaNumber('');
  };

  function handleSubmitClicked() {
    onSubmit(captchaNumber === captchaData.answer);
    setCaptchaNumber('');
  };

  return (
    <div className={styles.formDiv}>
      <div className={styles.leftDiv}>
        <p className={styles.captionText}><strong>Enter the number below</strong></p>
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
          value={captchaNumber} readOnly={true} type='text' pattern='\d+' name='captcha' />
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
