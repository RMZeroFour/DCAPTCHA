import { useNavigate } from 'react-router-dom';
import { AdminEntry } from '../components/AdminEntry.jsx';
import styles from './AdminPage.module.css';

export function AdminPage() {
  const navigate = useNavigate();

  function handleLogin(a, b) {
    console.log(a, b);
    navigate('/dash')
  }

  return (
    <div className={styles.page}>
      <div className={styles.topSpacer} />
      <p className={styles.captionText}><strong>Login to myAadhar Admin Portal</strong></p>
      <div className={styles.formBorder}>
        <AdminEntry onSubmit={handleLogin} />
      </div>
      <div className={styles.bottomSpacer} />
    </div>
  );
}
