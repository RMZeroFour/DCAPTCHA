import { useRef } from 'react';
import styles from './CredentialsTab.module.css';

export function CredentialsTab() {
  const passwordText = useRef('');

  function handlePasswordChanged(event) {
    passwordText.current = event.target.value;
  };

  function handleSubmitClicked() {
    console.log(passwordText.current);
  };

  return (
    <div className={styles.formDiv}>
      <input className={styles.passwordInp} onInput={handlePasswordChanged}
        placeholder='Enter New Password' type='password' pattern='.*' name='password' />
      <div className={styles.spacer} />
      <button className={styles.submitBtn} onClick={handleSubmitClicked}>Change Password</button>
    </div>
  );
}
