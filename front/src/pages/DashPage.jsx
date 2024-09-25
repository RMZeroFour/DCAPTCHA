import { useState } from 'react';
import { AdminStats } from '../components/AdminStats.jsx';
import styles from './DashPage.module.css';
import { AdminLayerControl } from '../components/AdminLayerControl.jsx';

export function DashPage() {
  const [currentTab, setCurrentTab] = useState(0);

  function handleSwitchTab(index) {
    setCurrentTab(index);
  }

  function mapIndexToTab(index) {
    switch (index) {
      case 0: return <AdminLayerControl />; // route layers
      case 1: return <AdminStats />;
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.sidebarDiv}>
        <>add a logo + welcome message</>
        <button onClick={() => handleSwitchTab(0)}>Layers</button>
        <button onClick={() => handleSwitchTab(1)}>Statistics</button>
      </div>
      <div className={styles.tabDiv}>
        {mapIndexToTab(currentTab)}
      </div>
    </div>
  );
}
