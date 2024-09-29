import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import fingerprint from '../../assets/fingerprint.png';

export function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.leftDiv}>
        <p className={styles.largeText}>Welcome to <strong>myAadhar</strong></p>
        <p className={styles.smallText}>Click on the login button to explore online demographics update service, Aadhaar PVC card ordering & tracking, and many more value-added services offered by UIDAI. Your mobile number needs to be registered with Aadhaar to login.</p>
      </div>
      <div className={styles.spacer} />
      <div className={styles.rightDiv}>
        <img className={styles.fingerprintImg} alt='A fingerprint' src={fingerprint} />
        <Link className={styles.userLoginBtn} to='/form'><strong>Login to myAadhar</strong></Link>
        <Link className={styles.adminLoginBtn} to='/admin'><strong>Login to myAadhar Admin</strong></Link>
      </div>
    </div>
  );
}
