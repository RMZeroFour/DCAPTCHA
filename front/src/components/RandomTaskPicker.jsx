import { FisherYatesShuffle } from '../utilities/Shuffle.jsx';
import { ColorsTask } from './ColorsTask.jsx';
import { MatchTask } from './MatchTask.jsx';
import { OrderingTask } from './OrderingTask.jsx';

export function RandomTaskPicker({ colorsEnabled, orderingEnabled, matchEnabled, onSubmit }) {
  const tasks = [];
  if (colorsEnabled) {
    tasks.push(0);
  }
  if (orderingEnabled) {
    tasks.push(1);
  }
  if (matchEnabled) {
    tasks.push(2);
  }

  switch (FisherYatesShuffle(tasks)[0]) {
    case 0: return <ColorsTask onSubmit={() => onSubmit('colors')} />;
    case 1: return <OrderingTask onSubmit={() => onSubmit('ordering')} />;
    case 2: return <MatchTask onSubmit={() => onSubmit('match')} />;
  }
}
