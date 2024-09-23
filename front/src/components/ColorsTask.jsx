import { useState } from 'react';
import { FisherYatesShuffle } from '../utilities/Shuffle.jsx';
import styles from './ColorsTask.module.css';

function generateInitialState() {
  const result = new Array(9).fill(true);
  const selected = FisherYatesShuffle(Array.from(Array(9).keys()));
  const count = Math.floor(Math.random() * 4 + 3);
  for (let i = 0; i < count; i++) {
    result[selected[i]] = false;
  }
  return result;
}

export function ColorsTask({ onSubmit }) {
  const [tileStatus, setTileStatus] = useState(generateInitialState());

  function getTileClass(index) {
    return `${styles.tileDiv} ${tileStatus[index] ? styles.unlitTileDiv : styles.litTileDiv}`;
  }

  function handleTileClicked(index) {
    const newStatus = tileStatus.map((t, i) => i == index ? !t : t);
    if (newStatus.every(x => x))
      onSubmit();
    setTileStatus(newStatus);
  }

  return (
    <div className={styles.formDiv}>
      <p className={styles.captionText}><strong>Turn all the tiles white</strong></p>
      <div className={styles.tileGrid}>
        <button className={getTileClass(0)} onClick={() => handleTileClicked(0)} />
        <button className={getTileClass(1)} onClick={() => handleTileClicked(1)} />
        <button className={getTileClass(2)} onClick={() => handleTileClicked(2)} />
        <button className={getTileClass(3)} onClick={() => handleTileClicked(3)} />
        <button className={getTileClass(4)} onClick={() => handleTileClicked(4)} />
        <button className={getTileClass(5)} onClick={() => handleTileClicked(5)} />
        <button className={getTileClass(6)} onClick={() => handleTileClicked(6)} />
        <button className={getTileClass(7)} onClick={() => handleTileClicked(7)} />
        <button className={getTileClass(8)} onClick={() => handleTileClicked(8)} />
      </div>
    </div>
  );
}
