import { Link } from 'react-router-dom';
import styles from './BotPage.module.css';
import cross from '../../assets/cross.png';

export function BotPage() {
  return (
    <div className={styles.page}>
      <img className={styles.crossImg} src={cross} alt='cross mark' />
      <p className={styles.largeText}><strong>BOT</strong></p>
      <p className={styles.smallText}>Sorry, you seem to be a bot!</p>
      <Link className={styles.returnLink} to='/'>Return to <strong>myAadhar</strong> Home</Link>
    </div>
  );
}
