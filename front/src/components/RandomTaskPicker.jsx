import { ColorsTask } from './ColorsTask.jsx';
import { MatchTask } from './MatchTask.jsx';
import { OrderingTask } from './OrderingTask.jsx';

export function RandomTaskPicker({ onSubmit }) {
  switch (Math.floor(Math.random() * 3)) {
    case 0: return <ColorsTask onSubmit={() => onSubmit('colors')} />;
    case 1: return <OrderingTask onSubmit={() => onSubmit('ordering')} />;
    case 2: return <MatchTask onSubmit={() => onSubmit('match')} />;
  }
}
