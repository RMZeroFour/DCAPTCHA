import { useRef } from 'react';
import styles from './AdminEntry.module.css';

export function AdminEntry({ onSubmit }) {
  const username = useRef('');
  const password = useRef('');
  
  function handleUsernameChanged(event) {
    username.current = event.target.value;
  };

  function handlePasswordChanged(event) {
    password.current = event.target.value;
  };

  function handleLoginClicked() {
    onSubmit(username.current, password.current);
  };

  return (
    <div className={styles.formDiv}>
      <input className={styles.usernameInp} onInput={handleUsernameChanged}
        placeholder='Enter Username' type='text' pattern='.*' name='username' />
      <input className={styles.passwordInp} onInput={handlePasswordChanged}
        placeholder='Enter Password' type='password' pattern='.*' name='password' />
      <div className={styles.spacer} />
      <button className={styles.submitBtn} onClick={handleLoginClicked}>Open DCAPTCHA Dashboard</button>
    </div>
  );
}
