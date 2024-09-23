import { ColorsTask } from "./ColorsTask.jsx";
import { OrderingTask } from "./OrderingTask.jsx";

export function RandomTaskPicker({ onSubmit }) {
  switch (Math.floor(Math.random() * 2)) {
    case 0: return <ColorsTask onSubmit={onSubmit}/>;
    case 1: return <OrderingTask onSubmit={onSubmit}/>;
  }
}
