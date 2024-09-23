import { useEffect, useRef } from 'react';
import styles from './AadharEntry.module.css';

export function AadharEntry({ onSubmit }) {
  const loadTime = useRef(null);
  const aadharText = useRef('');
  const typingTime = useRef({ first: null, last: null });

  useEffect(() => {
    loadTime.current = Date.now();
  }, []);

  function handleAadharChanged(event) {
    typingTime.current = { first: typingTime.current.first ?? Date.now(), last: Date.now() };
    aadharText.current = event.target.value;
  };

  function handleSubmitClicked() {
    const formTimeTaken = (Date.now() - loadTime.current) / 1000;
    const typingTimeTaken = (typingTime.current.last - typingTime.current.first) / 1000;
    const typingSpeed = aadharText.current.length / typingTimeTaken;
    onSubmit(typingSpeed, formTimeTaken, aadharText.current);
  };

  return (
    <div className={styles.formDiv}>
      <input className={styles.aadharInp} onInput={handleAadharChanged}
        placeholder='Enter Aadhar Number' type='text' pattern='\d+' name='aadhar' />
      <div className={styles.spacer} />
      <button className={styles.submitBtn} onClick={handleSubmitClicked}>Verify with DCAPTCHA</button>
    </div>
  );
}
