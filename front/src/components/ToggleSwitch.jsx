import styles from './ToggleSwitch.module.css';

export function ToggleSwitch({ label, checked, onChange }) {
  return (
    <div className={styles.container}>
      <div className={styles.toggle_switch}>
        <input className={styles.checkbox} type='checkbox'
          name={label} id={label} checked={checked} onChange={onChange} />
        <label className={styles.label} htmlFor={label}>
          <span className={styles.inner} />
          <span className={styles.switch} />
        </label>
      </div>
    </div>
  );
};