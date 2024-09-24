import { useState } from 'react';
import { AdminStats } from '../components/AdminStats.jsx';
import styles from './DashPage.module.css';

export function DashPage() {
  const [currentTab, setCurrentTab] = useState(0);

  function handleSwitchTab(index) {
    setCurrentTab(index);
  }

  function mapIndexToTab(index) {
    switch (index) {
      case 0: return <AdminStats />;
      case 1: return <AdminStats />;
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.sidebarDiv}>
        <button onClick={() => handleSwitchTab(0)}>stonks</button>
        <button onClick={() => handleSwitchTab(1)}>stonks2</button>
      </div>
      <div className={styles.tabDiv}>
        {mapIndexToTab(currentTab)}
      </div>
    </div>
  );
}
