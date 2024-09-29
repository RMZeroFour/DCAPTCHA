import { Chart } from 'react-google-charts';
import styles from './StatisticsTab.module.css';

export function StatisticsTab() {
  const data = [
    ['Layer', 'Human', 'Bot', 'Not Sure'],
    ['Layer One', 2099000, 1953000, 1953000],
    ['Layer Two', 3792000, 3694000, 3694000],
    ['Layer Three', 2695000, 2896000, 2896000],
    ['All Layers', 8175000, 8008000, 8008000],
  ];

  const options = {
    title: 'DCAPTCHA Analytics',
    isStacked: true,
  };

  return (
    <div className={styles.tabDiv} >
      <Chart chartType='ColumnChart' width='100%' height='100%' data={data} options={options} />
    </div >
  );
}
