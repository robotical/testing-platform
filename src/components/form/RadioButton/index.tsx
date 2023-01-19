import React, { useState } from "react";
import styles from "./styles.module.css";

interface Props {
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  direction?: "row" | "column";
}

const RadioButton: React.FC<Props> = ({
  name,
  value,
  checked,
  onChange,
  label,
  direction = "row"
}) => {
  return (
    <div className={styles.radioButtonWrapper} style={{
      flexDirection: direction === "row" ? "row" : "column"
    }}>
      <input
        type="radio"
        id={name}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.radioButtonInput}
      />
      <label htmlFor={name} className={styles.radioButtonLabel}>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
