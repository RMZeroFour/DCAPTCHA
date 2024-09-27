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
    console.log({ layer: 'Layer 1', typingSpeed, timeTaken, mouseDistance, geolocation });
    fetch('https://dcaptcha.onrender.com/collect_data_layer_one/',
      {
        method: 'POST',
        body: JSON.stringify({
          'is_abuser': geolocation.isAbuser.current,
          'time_taken': timeTaken,
          'typing_speed': typingSpeed,
          'mouse_distance': mouseDistance.current,
          'is_proxy': geolocation.isProxy.current,
          'state': geolocation.state.current,
          'country': geolocation.country.current,
        })
      }
    );
    setCurrentLayer(2);
  }

  function handleSubmitNumpad(correct) {
    const timeTaken = stopwatch.readAndRestart();
    console.log({ layer: 'Layer 2', timeTaken, mouseDistance, geolocation });
    fetch('https://dcaptcha.onrender.com/collect_data_layer_two/',
      {
        method: 'POST',
        body: JSON.stringify({
          'is_abuser': geolocation.isAbuser.current,
          'time_taken': timeTaken,
          'mouse_distance': mouseDistance.current,
          'is_proxy': geolocation.isProxy.current,
          'state': geolocation.state.current,
          'country': geolocation.country.current,
          'is_solved': correct
        })
      }
    );
    if (correct) {
      setCurrentLayer(3);
    }
  }

  function handleSubmitTask(taskName) {
    const timeTaken = stopwatch.readAndRestart();
    console.log({ layer: 'Layer 3', timeTaken, mouseDistance, geolocation });
    fetch('https://dcaptcha.onrender.com/collect_data_layer_three/',
      {
        method: 'POST',
        body: JSON.stringify({
          'is_abuser': geolocation.isAbuser.current,
          'time_taken': timeTaken,
          'mouse_distance': mouseDistance.current,
          'is_proxy': geolocation.isProxy.current,
          'state': geolocation.state.current,
          'country': geolocation.country.current,
          'problem_solved': taskName
        })
      }
    );
    navigate(Math.random() < 0.5 ? '/human' : '/bot');
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
