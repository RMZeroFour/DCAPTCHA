import React, { useState, useEffect } from 'react';
import './colorSelection.css';

const gridSize = 9; //3 X 3 


const ColorSelectionTask = () => {
  const [grid, setGrid] = useState([]);
  const [message, setMessage] = useState(null);

  const numColoredBoxes = Math.floor(Math.random() * (7 - 3 + 1)) + 3; // Randomly generated Number of boxes that will be colored 

  const generateShuffledGrid = () => {
    setMessage(null);
    const gridArray = Array(gridSize).fill(false);
    const coloredIndices = new Set();

    while (coloredIndices.size < numColoredBoxes) {
      const randomIndex = Math.floor(Math.random() * gridSize);
      coloredIndices.add(randomIndex);
    }

    coloredIndices.forEach(index => {
      gridArray[index] = true;
    });

    setGrid(gridArray);
  };

  useEffect(() => {
    generateShuffledGrid();
  }, []);

  const handleBoxClick = (index) => {
    const newGrid = [...grid];
    if (newGrid[index]) {
      newGrid[index] = false;
      setGrid(newGrid);

      const allDecolored = newGrid.every(box => !box);
      if (allDecolored) {
         setMessage('Congratulations! All boxes are decolored.'); // Set message to show on the screen
      }
    }
  };

  return (
    <div className='custom-Wrapper'>
    <div className="custom-container">
      {message? <h2>{message}</h2> : <h2>Click all the colored boxes to decolor them!</h2>}
      <div className="custom-grid-container">
        {grid.map((isColored, index) => (
          <div
            key={index}
            className={`custom-grid-item ${isColored ? 'custom-colored' : ''}`}
            onClick={() => handleBoxClick(index)}
          ></div>
        ))}
      </div>
      <button className="custom-shuffle-button" onClick={generateShuffledGrid}>Shuffle Grid</button>
    </div>
    </div>
  );
};

export default ColorSelectionTask;
