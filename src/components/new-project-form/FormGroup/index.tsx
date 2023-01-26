import { Fragment } from "react";
import randomHashGenerator from "../../../utils/random-hash-generator";
import styles from "./styles.module.css";

type FormGroupProps = {
  name: string;
  label: string;
  type: "text" | "textarea" | "radio";
  value: string;
  options?: string[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function FormGroup({
  name,
  label,
  type,
  value,
  options,
  onChange,
}: FormGroupProps) {
  let inputTypeJSX: React.ReactNode = <Fragment></Fragment>;
  if (type === "text") {
    inputTypeJSX = (
      <Fragment>
        <label htmlFor={name}>{label}:</label>
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        />
      </Fragment>
    );
  } else if (type === "textarea") {
    inputTypeJSX = (
      <Fragment>
        <label htmlFor={name}>{label}:</label>
        <textarea id={name} name={name} value={value} onChange={onChange} />
      </Fragment>
    );
  } else if (type === "radio" && options) {
    inputTypeJSX = options.map((option, index) => {
      const JSX = (
        <div key={index} className={styles.type_container}>
          <input
            type="radio"
            id={name}
            name={name}
            value={option}
            checked={value === option}
            onChange={onChange}
          />
          <label htmlFor={name}>{option}</label>
        </div>
      );
      if (index === 0) {
        return (
          <Fragment key={index}>
            <div
              className={styles.type_title}
            >
              Type:
            </div>
            {JSX}
          </Fragment>
        );
      } else {
        return JSX;
      }
    });
  }

  return <div className={styles.formGroup}>{inputTypeJSX}</div>;
}
