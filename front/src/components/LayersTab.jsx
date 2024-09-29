import { useState } from 'react';
import { ToggleSwitch } from './ToggleSwitch.jsx';
import styles from './LayersTab.module.css';

export function LayersTab() {
  const [layerOne, setLayerOne] = useState(false);
  const [layerTwo, setLayerTwo] = useState(false);
  const [layerThreeOrdering, setLayerThreeOrdering] = useState(false);
  const [layerThreeMatch, setLayerThreeMatch] = useState(false);
  const [layerThreeColor, setLayerThreeColor] = useState(false);

  function handleSubmit() {

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
