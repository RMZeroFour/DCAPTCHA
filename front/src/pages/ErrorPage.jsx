import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';

export function ErrorPage() {
  return (
    <div className={styles.page}>
      <p className={styles.largeText}><strong>404</strong></p>
      <p className={styles.smallText}>You seem to have gotten lost!</p>
      <Link className={styles.returnLink} to='/'>Return to <strong>myAadhar</strong> Home</Link>
    </div>
  );
}
