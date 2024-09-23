import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FisherYatesShuffle } from '../utilities/Shuffle.jsx';
import styles from './OrderingTask.module.css';

function generateInitialState() {
  return FisherYatesShuffle(Array.from(Array(8).keys()).map(i => i + 1));
}

export function OrderingTask({ onSubmit }) {
  const correctSelected = useRef(0);
  const tileNumbers = useRef(generateInitialState());
  const [tileStatus, setTileStatus] = useState(new Array(8).fill(false));

  function getTileClass(index) {
    return `${styles.tileDiv} ${tileStatus[index] ? styles.selectedTileDiv : styles.unselectedTileDiv}`;
  }

  function handleTileClicked(index) {
    if (correctSelected.current + 1 === tileNumbers.current[index]) {
      tileNumbers.current[index] = <FontAwesomeIcon icon={faCheck}/>;

      const newStatus = tileStatus.map((t, i) => i == index ? true : t);
      if (newStatus.every(x => x))
        onSubmit();
      setTileStatus(newStatus);

      correctSelected.current++;
    }
  }

  return (
    <div className={styles.formDiv}>
      <p className={styles.captionText}><strong>Click the tiles in order</strong></p>
      <div className={styles.tileGrid}>
        <button className={getTileClass(0)} onClick={() => handleTileClicked(0)}>{tileNumbers.current[0]}</button>
        <button className={getTileClass(1)} onClick={() => handleTileClicked(1)}>{tileNumbers.current[1]}</button>
        <button className={getTileClass(2)} onClick={() => handleTileClicked(2)}>{tileNumbers.current[2]}</button>
        <button className={getTileClass(3)} onClick={() => handleTileClicked(3)}>{tileNumbers.current[3]}</button>
        <button className={getTileClass(4)} onClick={() => handleTileClicked(4)}>{tileNumbers.current[4]}</button>
        <button className={getTileClass(5)} onClick={() => handleTileClicked(5)}>{tileNumbers.current[5]}</button>
        <button className={getTileClass(6)} onClick={() => handleTileClicked(6)}>{tileNumbers.current[6]}</button>
        <button className={getTileClass(7)} onClick={() => handleTileClicked(7)}>{tileNumbers.current[7]}</button>
      </div>
    </div>
  );
}
