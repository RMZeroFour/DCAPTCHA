import { useEffect, useRef, useState } from 'react';
import { Chart } from 'react-google-charts';
import styles from './StatisticsTab.module.css';

export function StatisticsTab() {
  const [showGraph, setShowGraph] = useState(false);
  const data = useRef([
    ['Layer', 'Human', 'Bot', 'Not Sure'],
    ['Layer One', 0, 0, 0],
    ['Layer Two', 0, 0, 0],
    ['Layer Three', 0, 0, 0],
    ['All Layers', 0, 0, 0],
  ]);
  const options = {
    title: 'DCAPTCHA Analytics',
    isStacked: true,
  };

  async function fetchData() {
    function updateLayer(index, human, bot, not_sure) {
      data.current[index][1] = human;
      data.current[index][2] = bot;
      data.current[index][3] = not_sure;
    }

    let index = 1;
    for (let layer of ['one', 'two', 'three']) {
      let res = await fetch(`http://localhost:8000/analytics/layer_${layer}/`, { method: 'GET' });
      res = await res.json();
      updateLayer(index++, res['data']['human'], res['data']['bot'], res['data']['not_sure']);
    }
    
    data.current[4][1] = data.current[1][1] + data.current[2][1] + data.current[3][1];
    data.current[4][2] = data.current[1][2] + data.current[2][2] + data.current[3][2];
    data.current[4][3] = data.current[1][3] + data.current[2][3] + data.current[3][3];
    setShowGraph(true);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  return (
    <div className={styles.tabDiv}>
      {
        showGraph
          ? <Chart chartType='ColumnChart' width='100%' height='100%' data={data.current} options={options} />
          : null
      }
    </div>
  );
}
