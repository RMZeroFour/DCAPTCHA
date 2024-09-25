import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStopwatch } from '../hooks/Stopwatch.jsx';
import { useMouseDistance } from '../hooks/MouseDistance.jsx';
import { useGeolocation } from '../hooks/Geolocation.jsx';
import { AadharEntry } from '../components/AadharEntry.jsx';
import { NumpadCaptcha } from '../components/NumpadCaptcha.jsx';
import { RandomTaskPicker } from '../components/RandomTaskPicker.jsx';
import styles from './FormPage.module.css';

export function FormPage() {
  const navigate = useNavigate();
  const stopwatch = useStopwatch();
  const mouseDistance = useMouseDistance();
  const geolocation = useGeolocation();
  const [currentLayer, setCurrentLayer] = useState(1);

  useEffect(() => {
    stopwatch.start();
  }, []);

  function handleSubmitAadhar(typingSpeed) {
    const timeTaken = stopwatch.readAndRestart();
    console.log({ layer: 'Layer 1', typingSpeed, timeTaken, mouseDistance, geolocationData: geolocation });
    setCurrentLayer(2);
  }

  function handleSubmitNumpad() {
    const timeTaken = stopwatch.readAndRestart();
    console.log({ layer: 'Layer 2', timeTaken, mouseDistance, geolocationData: geolocation });
    setCurrentLayer(3);
  }

  function handleSubmitTask() {
    const timeTaken = stopwatch.readAndRestart();    
    console.log({ layer: 'Layer 3', timeTaken, mouseDistance, geolocationData: geolocation });
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
