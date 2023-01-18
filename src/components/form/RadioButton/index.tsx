import React, { useState } from 'react';
import styles from './styles.module.css';

interface Props {
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const RadioButton: React.FC<Props> = ({ name, value, checked, onChange, label }) => {
  return (
    <div className={styles.radioButtonWrapper}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.radioButtonInput}
      />
      <label htmlFor={value} className={styles.radioButtonLabel}>{label}</label>
    </div>
  );
};

export default RadioButton;
