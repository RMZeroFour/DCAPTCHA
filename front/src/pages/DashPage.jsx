import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faDiagramProject, faDoorOpen, faLayerGroup, faLock } from '@fortawesome/free-solid-svg-icons';
import { useAuthentication } from '../context/Authentication.jsx';
import { CredentialsTab } from '../components/CredentialsTab.jsx';
import { DatabaseTab } from '../components/DatabaseTab.jsx';
import { LayersTab } from '../components/LayersTab.jsx';
import { StatisticsTab } from '../components/StatisticsTab.jsx';
import styles from './DashPage.module.css';

export function DashPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useAuthentication();
  const [currentTab, setCurrentTab] = useState(0);

  function handleSwitchTab(index) {
    setCurrentTab(index);
  }

  function handleSignOut() {
    setUsername(null);
    navigate('/');
  }

  function mapIndexToTab(index) {
    switch (index) {
      case 0: return <StatisticsTab />;
      case 1: return <LayersTab />;
      case 2: return <DatabaseTab />;
      case 3: return <CredentialsTab />;
    }
  }

  function getBtnClass(index) {
    return `${styles.tabBtn} ${currentTab === index ? styles.selectedTabBtn : ''}`;
  }

  return (
    <div className={styles.page}>
      <aside className={styles.sidebarAside}>
        <p className={styles.titleText}><strong>DCAPTCHA<br/>Dashboard</strong></p>
        <button className={getBtnClass(0)} onClick={() => handleSwitchTab(0)}>
          <FontAwesomeIcon icon={faChartLine} /> Statistics
        </button>
        <button className={getBtnClass(1)} onClick={() => handleSwitchTab(1)}>
          <FontAwesomeIcon icon={faLayerGroup} /> Layers
        </button>
        <button className={getBtnClass(2)} onClick={() => handleSwitchTab(2)}>
          <FontAwesomeIcon icon={faDiagramProject} /> Database
        </button>
        <button className={getBtnClass(3)} onClick={() => handleSwitchTab(3)}>
          <FontAwesomeIcon icon={faLock} /> Credentials
        </button>
        <button className={styles.signOutBtn} onClick={handleSignOut}>
          <FontAwesomeIcon icon={faDoorOpen} /> Sign Out
        </button>
      </aside>
      <div className={styles.tabDiv}>
        {mapIndexToTab(currentTab)}
      </div>
    </div>
  );
}
