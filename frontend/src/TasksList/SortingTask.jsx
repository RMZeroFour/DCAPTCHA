import React, { useState, useEffect } from 'react';
import './sortingTask.css';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const SortingTask = () => {
  const [shuffledNumbers, setShuffledNumbers] = useState([]);
  const [clickedOrder, setClickedOrder] = useState([]);
  const [isHuman, setIsHuman] = useState(false);
  
  // Shuffle numbers when the component mounts
  useEffect(() => {
    setShuffledNumbers(shuffleArray([...numbers]));
  }, []);
  
  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  
  const handleNumberClick = (num) => {
    // If the number clicked is the next in sorted order
    if (num === clickedOrder.length + 1) {
      setClickedOrder([...clickedOrder, num]);
      
      // If all numbers are clicked in order
      if (clickedOrder.length + 1 === 9) {
        setIsHuman(true);
      }
    } else {
      // Reset if the user clicks out of order 
      alert('Wrong order! Try again.');
      setClickedOrder([]);
    }
  };

  return (
    <div className='task-Wrapper'>
    <div className="container">
      <h2>{isHuman ? "You're human!" : "Click numbers in sorted order from 1 to 9 :"}</h2>
      <div className="grid-container">
        {shuffledNumbers.map((num) => (
          <div
            key={num}
            className={`grid-item ${clickedOrder.includes(num) ? 'clicked' : ''}`}
            onClick={() => handleNumberClick(num)}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
</div>
  );
};

export default SortingTask;
