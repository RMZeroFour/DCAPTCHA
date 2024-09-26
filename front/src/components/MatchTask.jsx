import { useRef, useState } from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faSquare, faStar } from '@fortawesome/free-solid-svg-icons';
import { FisherYatesShuffle } from '../utilities/Shuffle.jsx';
import styles from './MatchTask.module.css';

export function MatchTask({ onSubmit }) {
  const ordering = useRef(FisherYatesShuffle([0, 1, 2]));
  const [selected, setSelected] = useState(new Array(3).fill(false));
  const [arrows, setArrows] = useState(new Array(3).fill(false));

  function getLeftTileClass(index) {
    return `${getRightTileClass(index)} ${selected[index] ? styles.selectedTileDiv : ''}`;
  }

  function getRightTileClass(index) {
    switch (index) {
      case 0: return `${styles.tileDiv} ${styles.squareDiv}`;
      case 1: return `${styles.tileDiv} ${styles.circleDiv}`;
      case 2: return `${styles.tileDiv} ${styles.starDiv}`;
    }
  }

  function getTileIcon(index) {
    switch (index) {
      case 0: return faSquare;
      case 1: return faCircle;
      case 2: return faStar;
    }
  }

  function handleLeftTileClicked(index) {
    setSelected(selected.map((x, i) => (index == i && !arrows[i] ? !x : false)));
  }

  function handleRightTileClicked(index) {
    const leftIndex = selected.indexOf(true);
    if (leftIndex === ordering.current[index]) {
      setSelected(selected.fill(false));
      const newArrows = arrows.map((x, i) => leftIndex === i ? true : x);
      if (newArrows.every(x => x)) {
        onSubmit();
      }
      setArrows(newArrows);
    }
  }

  function getRelations(index) {
    if (arrows[ordering.current[index]]) {
      return [{
        targetId: `left${ordering.current[index]}`,
        targetAnchor: 'right',
        sourceAnchor: 'left',
        style: {
          startMarker: true,
          endMarker: true,
        }
      }];
    }
    return [];
  }

  return (
    <div className={styles.formDiv}>
      <p className={styles.instructionText}><strong>Connect all matching shapes</strong></p>
      <ArcherContainer>
        <div className={styles.tileGrid}>
          <div className={styles.leftDiv}>
            <ArcherElement id='left0'>
              <button className={getLeftTileClass(0)} onClick={() => handleLeftTileClicked(0)}>
                <FontAwesomeIcon icon={faSquare} />
              </button>
            </ArcherElement>
            <ArcherElement id='left1'>
              <button className={getLeftTileClass(1)} onClick={() => handleLeftTileClicked(1)}>
                <FontAwesomeIcon icon={faCircle} />
              </button>
            </ArcherElement>
            <ArcherElement id='left2'>
              <button className={getLeftTileClass(2)} onClick={() => handleLeftTileClicked(2)}>
                <FontAwesomeIcon icon={faStar} />
              </button>
            </ArcherElement>
          </div>
          <div className={styles.rightDiv}>
            <ArcherElement id='right0' relations={getRelations(0)}>
              <button className={getRightTileClass(ordering.current[0])} onClick={() => handleRightTileClicked(0)}>
                <FontAwesomeIcon icon={getTileIcon(ordering.current[0])} />
              </button>
            </ArcherElement>
            <ArcherElement id='right1' relations={getRelations(1)}>
              <button className={getRightTileClass(ordering.current[1])} onClick={() => handleRightTileClicked(1)}>
                <FontAwesomeIcon icon={getTileIcon(ordering.current[1])} />
              </button>
            </ArcherElement>
            <ArcherElement id='right2' relations={getRelations(2)}>
              <button className={getRightTileClass(ordering.current[2])} onClick={() => handleRightTileClicked(2)}>
                <FontAwesomeIcon icon={getTileIcon(ordering.current[2])} />
              </button>
            </ArcherElement>
          </div>
        </div>
      </ArcherContainer>
    </div>
  )
}
