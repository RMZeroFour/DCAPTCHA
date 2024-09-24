import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMouseDistance } from '../hooks/MouseDistance.jsx';
import { useGeolocationData } from '../hooks/GeolocationData.jsx';
import { AadharEntry } from '../components/AadharEntry.jsx';
import { NumpadCaptcha } from '../components/NumpadCaptcha.jsx';
import { RandomTaskPicker } from '../components/RandomTaskPicker.jsx';
import styles from './FormPage.module.css';

export function FormPage() {
  const navigate = useNavigate();
  const mouseDistance = useMouseDistance();
  const geolocationData = useGeolocationData();
  const [currentLayer, setCurrentLayer] = useState(1);

  function handleSubmitAadhar(typingSpeed, formTimeTaken, aadharText) {
    console.log({ typingSpeed, formTimeTaken, aadharText, mouseDistance, geolocationData });
    setCurrentLayer(2);
  }

  function handleSubmitNumpad() {
    setCurrentLayer(3);
  }

  function handleSubmitTask() {
    switch (Math.floor(Math.random() * 3)) {
      case 0: navigate('/human'); break;
      case 1: navigate('/bot'); break;
      case 2: navigate('/error'); break;
    }
  }

  function mapIndexToLayer(index) {
    switch (index) {
      case 1: return <AadharEntry onSubmit={handleSubmitAadhar} />;
      case 2: return <NumpadCaptcha onSubmit={handleSubmitNumpad} />;
      case 3: return <RandomTaskPicker onSubmit={handleSubmitTask} />;
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.topSpacer} />
      <p className={styles.captionText}><strong>Login to myAadhar Portal</strong></p>
      <div className={styles.formBorder}>{mapIndexToLayer(currentLayer)}</div>
      <div className={styles.bottomSpacer} />
    </div>
  );
}
