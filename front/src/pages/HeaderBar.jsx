import styles from './HeaderBar.module.css';
import uidai from '../../assets/uidai.svg';
import aadhar from '../../assets/aadhar.svg';

export function HeaderBar() {
  return (
    <div className={styles.bar}>
      <img alt='UIDAI Logo' src={uidai} />
      <div className={styles.spacer}/>
      <img alt='AADHAR Logo' src={aadhar} />
    </div>
  );
}
