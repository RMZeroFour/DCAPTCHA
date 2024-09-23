import { Link } from 'react-router-dom';
import styles from './HumanPage.module.css';
import tick from '../../assets/tick.png';

export function HumanPage() {
  return (
    <div className={styles.page}>
      <img className={styles.tickImg} src={tick} alt='tick mark' />
      <p className={styles.largeText}><strong>HUMAN</strong></p>
      <p className={styles.smallText}>You are a human... we think.</p>
      <Link className={styles.returnLink} to='/'>Return to <strong>myAadhar</strong> Home</Link>
    </div>
  );
}
