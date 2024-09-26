import React from "react";
import styles from "./ToggleSwitch.module.css";

export const ToggleSwitch = ({ label, checked, onChange }) => {
  return (
    <div className={styles.container}>
      {label}{" "}
      <div className={styles.toggle_switch}>
        <input
          type="checkbox"
          className={styles.checkbox}
          name={label}
          id={label}
          checked={checked}
          onChange={onChange}
        />
        <label className={styles.label} htmlFor={label}>
          <span className={styles.inner} />
          <span className={styles.switch} />
        </label>
      </div>
    </div>
  );
};

//export default ToggleSwitch; 