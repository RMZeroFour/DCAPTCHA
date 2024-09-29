import { useState } from 'react';
import { ToggleSwitch } from './ToggleSwitch.jsx';
import styles from './DatabaseTab.module.css';

export function DatabaseTab() {
  const [botDataCollection, setBotDataCollection] = useState(false);
  const [humanDataCollection, setHumanDataCollection] = useState(false);

  function handleToggle(index) {
    if (index === 0) {
      const newBotDataCollection = !botDataCollection;
      setBotDataCollection(!botDataCollection);
      if (newBotDataCollection) {
        setHumanDataCollection(false);
      }
    }
    else {
      const newHumanDataCollection = !humanDataCollection;
      setHumanDataCollection(!humanDataCollection);
      if (newHumanDataCollection) {
        setBotDataCollection(false);
      }
    }
  }

  function handleSubmit() {

  }

  return (
    <div className={styles.formDiv}>
      <div className={styles.optionRow}>
        <p>Bot Data Collection Mode</p>
        <ToggleSwitch label='bot_data' checked={botDataCollection} onChange={() => handleToggle(0)} />
      </div>
      <div className={styles.optionRow}>
        <p>Human Data Collection Mode</p>
        <ToggleSwitch label='human_data' checked={humanDataCollection} onChange={() => handleToggle(1)} />
      </div>
      <div className={styles.spacer} />
      <button className={styles.submitBtn} onClick={handleSubmit}>Update Configuration</button>
    </div>
  );
}
