import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../context/Authentication.jsx';
import { AdminEntry } from '../components/AdminEntry.jsx';
import styles from './AdminPage.module.css';

export function AdminPage() {
  const navigate = useNavigate();
  const authentication = useAuthentication();

  useEffect(() => {
    if (authentication.username !== null) {
      navigate('/dash');
    }
  }, [authentication.username, navigate]);

  function handleLogin(a, b) {
    if (a === 'bob' && b === 'bob') {
      authentication.setUsername(a);
    }
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
