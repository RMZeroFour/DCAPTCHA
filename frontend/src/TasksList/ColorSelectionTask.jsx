import React, { useState, useEffect } from 'react';
import './colorSelection.css';

const gridSize = 9; //3 X 3 


const ColorSelectionTask = () => {
  const [grid, setGrid] = useState([]);
  const [message, setMessage] = useState(null);

  const numColoredBoxes = Math.floor(Math.random() * (7 - 3 + 1)) + 3; // Randomly generated Number of boxes that will be colored 

  // Function to shuffle and color random boxes
  const generateShuffledGrid = () => {
    setMessage(null);
    const gridArray = Array(gridSize).fill(false);
    const coloredIndices = new Set();

    // Randomly choose boxes to color
    while (coloredIndices.size < numColoredBoxes) {
      const randomIndex = Math.floor(Math.random() * gridSize);
      coloredIndices.add(randomIndex);
    }

    // Update the grid with colored boxes (true represents colored)
    coloredIndices.forEach(index => {
      gridArray[index] = true;
    });

    setGrid(gridArray);
  };

  // Generate a new shuffled grid when the component mounts
  useEffect(() => {
    generateShuffledGrid();
  }, []);

  // Handle clicking a box
  const handleBoxClick = (index) => {
    const newGrid = [...grid];
    if (newGrid[index]) {
      // Decolor the box
      newGrid[index] = false;
      setGrid(newGrid);

      // Check if all colored boxes are now decolored
      const allDecolored = newGrid.every(box => !box); // Checks if all boxes are 'false'
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
