import { useEffect, useState } from 'react';
import { ToggleSwitch } from './ToggleSwitch.jsx';
import styles from './LayersTab.module.css';

export function LayersTab() {
  const [layerOne, setLayerOne] = useState(false);
  const [layerTwo, setLayerTwo] = useState(false);
  const [layerThreeOrdering, setLayerThreeOrdering] = useState(false);
  const [layerThreeMatch, setLayerThreeMatch] = useState(false);
  const [layerThreeColor, setLayerThreeColor] = useState(false);

  async function fetchData() {
    let res = await fetch('http://localhost:8000/config/layers/', { method: 'GET' });
    res = await res.json();

    setLayerOne(res['data']['layer_one']);
    setLayerTwo(res['data']['layer_two']);
    setLayerThreeOrdering(res['data']['layer_three']['ordering']);
    setLayerThreeMatch(res['data']['layer_three']['match']);
    setLayerThreeColor(res['data']['layer_three']['colors']);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  async function handleSubmit() {
    if (![layerOne, layerTwo, layerThreeOrdering, layerThreeMatch, layerThreeColor].some(x => x)) {
      alert('at least one layer must be enabled!')
    }
    else {
      const payload = JSON.stringify({
        layer_one: layerOne,
        layer_two: layerTwo,
        layer_three: {
          ordering: layerThreeOrdering,
          match: layerThreeMatch,
          colors: layerThreeColor
        }
      });
      await fetch('http://localhost:8000/config/layers/', { method: 'POST', body: payload });
    }
  }

  return (
    <div className={styles.formDiv}>
      <div className={styles.optionRow}>
        <p>Layer One</p>
        <ToggleSwitch label='layer_one' checked={layerOne}
          onChange={() => setLayerOne(!layerOne)} />
      </div>
      <div className={styles.optionRow}>
        <p>Layer Two</p>
        <ToggleSwitch label='layer_two' checked={layerTwo}
          onChange={() => setLayerTwo(!layerTwo)} />
      </div>
      <div className={styles.optionRow}>
        <p>Layer Three, Ordering Task</p>
        <ToggleSwitch label='layer_three_ordering' checked={layerThreeOrdering}
          onChange={() => setLayerThreeOrdering(!layerThreeOrdering)} />
      </div>
      <div className={styles.optionRow}>
        <p>Layer Three, Matching Task</p>
        <ToggleSwitch label='layer_three_match' checked={layerThreeMatch}
          onChange={() => setLayerThreeMatch(!layerThreeMatch)} />
      </div>
      <div className={styles.optionRow}>
        <p>Layer Three, Colors Task</p>
        <ToggleSwitch label='layer_three_color' checked={layerThreeColor}
          onChange={() => setLayerThreeColor(!layerThreeColor)} />
      </div>
      <div className={styles.spacer} />
      <button className={styles.submitBtn} onClick={handleSubmit}>Update Configuration</button>
    </div>
  );
}
