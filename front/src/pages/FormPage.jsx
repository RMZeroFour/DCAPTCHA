import { useEffect, useRef, useState } from 'react';
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
  const [currentLayer, setCurrentLayer] = useState(null);

  const layerOne = useRef(false);
  const layerTwo = useRef(false);
  const layerThreeOrdering = useRef(false);
  const layerThreeMatch = useRef(false);
  const layerThreeColor = useRef(false);
  const botDataCollection = useRef(false);
  const humanDataCollection = useRef(false);

  useEffect(() => {
    stopwatch.start();
  }, [stopwatch]);

  function advanceToNextLayer() {
    if (currentLayer === null) {
      setCurrentLayer(1);
    }
    else if (currentLayer === 1) {
      if (layerTwo.current) {
        setCurrentLayer(2);
      }
      else if (layerThreeOrdering.current || layerThreeMatch.current || layerThreeColor.current) {
        setCurrentLayer(3);
      }
      else {
        navigate('/bot');
      }
    }
    else if (currentLayer === 2) {
      if (layerThreeOrdering.current || layerThreeMatch.current || layerThreeColor.current) {
        setCurrentLayer(3);
      }
      else {
        navigate('/bot');
      }
    }
  }

  async function fetchData() {
    let res = await fetch('http://localhost:8000/config/data_collection/', { method: 'GET' });
    res = await res.json();

    botDataCollection.current = res['data']['bot'];
    humanDataCollection.current = res['data']['human'];

    res = await fetch('http://localhost:8000/config/layers/', { method: 'GET' });
    res = await res.json();

    layerOne.current = res['data']['layer_one'];
    layerTwo.current = res['data']['layer_two'];
    layerThreeOrdering.current = res['data']['layer_three']['ordering'];
    layerThreeMatch.current = res['data']['layer_three']['match'];
    layerThreeColor.current = res['data']['layer_three']['colors'];

    advanceToNextLayer();
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  async function handleSubmitAadhar(typingSpeed) {
    if (layerOne.current) {
      const timeTaken = stopwatch.readAndRestart();
      if (humanDataCollection.current || botDataCollection.current) {
        const payload = JSON.stringify({
          is_abuser: geolocation.isAbuser.current,
          time_taken: timeTaken,
          typing_speed: typingSpeed,
          mouse_distance: mouseDistance.current,
          is_proxy: geolocation.isProxy.current,
          state: geolocation.state.current,
          country: geolocation.country.current,
          is_bot: botDataCollection.current
        });
        await fetch('http://localhost:8000/training_data/layer_one/', { method: 'POST', body: payload });
        advanceToNextLayer();
      }
      else {
        const payload = JSON.stringify({
          is_abuser: geolocation.isAbuser.current,
          time_taken: timeTaken,
          typing_speed: typingSpeed,
          mouse_distance: mouseDistance.current,
          is_proxy: geolocation.isProxy.current,
          state: geolocation.state.current,
          country: geolocation.country.current,
        });

        let res = await fetch('http://localhost:8000/predict/layer_one/', { method: 'POST', body: payload });
        res = await res.json();

        const verdict = res['result'];
        switch (verdict) {
          case 'Human': navigate('/human'); break;
          case 'Bot': navigate('/bot'); break;
          default: advanceToNextLayer(); break;
        }
      }
    }
    else {
      advanceToNextLayer();
    }
  }

  async function handleSubmitNumpad(correct) {
    const timeTaken = stopwatch.readAndRestart();
    if (humanDataCollection.current || botDataCollection.current) {
      const payload = JSON.stringify({
        is_abuser: geolocation.isAbuser.current,
        time_taken: timeTaken,
        mouse_distance: mouseDistance.current,
        is_proxy: geolocation.isProxy.current,
        state: geolocation.state.current,
        country: geolocation.country.current,
        is_solved: correct,
        is_bot: botDataCollection.current
      });
      await fetch('http://localhost:8000/training_data/layer_two/', { method: 'POST', body: payload });
      advanceToNextLayer();
    }
    else if (correct) {
      const payload = JSON.stringify({
        is_abuser: geolocation.isAbuser.current,
        time_taken: timeTaken,
        mouse_distance: mouseDistance.current,
        is_proxy: geolocation.isProxy.current,
        state: geolocation.state.current,
        country: geolocation.country.current,
        is_solved: true,
      });

      let res = await fetch('http://localhost:8000/predict/layer_two/', { method: 'POST', body: payload });
      res = await res.json();

      const verdict = res['result'];
      switch (verdict) {
        case 'Human': navigate('/human'); break;
        case 'Bot': navigate('/bot'); break;
        default: advanceToNextLayer(); break;
      }
    }
  }

  async function handleSubmitTask(taskName) {
    const timeTaken = stopwatch.readAndRestart();
    if (humanDataCollection.current || botDataCollection.current) {
      const payload = JSON.stringify({
        is_abuser: geolocation.isAbuser.current,
        time_taken: timeTaken,
        mouse_distance: mouseDistance.current,
        is_proxy: geolocation.isProxy.current,
        state: geolocation.state.current,
        country: geolocation.country.current,
        problem_solved: taskName,
        is_bot: botDataCollection.current
      });
      await fetch('http://localhost:8000/training_data/layer_three/', { method: 'POST', body: payload });
      switch (Math.floor(Math.random() * 2)) {
        case 0: navigate('/human'); break;
        case 1: navigate('/bot'); break;
      }
    }
    else {
      const payload = JSON.stringify({
        is_abuser: geolocation.isAbuser.current,
        time_taken: timeTaken,
        mouse_distance: mouseDistance.current,
        is_proxy: geolocation.isProxy.current,
        state: geolocation.state.current,
        country: geolocation.country.current,
        problem_solved: taskName,
      });

      let res = await fetch('http://localhost:8000/predict/layer_three/', { method: 'POST', body: payload });
      res = await res.json();

      const verdict = res['result'];
      switch (verdict) {
        case 'Human': navigate('/human'); break;
        default: navigate('/bot'); break;
      }
    }
  }

  function mapIndexToLayer(index) {
    switch (index) {
      case 1: return <AadharEntry onSubmit={handleSubmitAadhar} />;
      case 2: return <NumpadCaptcha onSubmit={handleSubmitNumpad} />;
      case 3: return <RandomTaskPicker onSubmit={handleSubmitTask} colorsEnabled={layerThreeColor.current}
        matchEnabled={layerThreeMatch.current} orderingEnabled={layerThreeOrdering.current} />;
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
