import { useState } from "react";
import { useDispatch } from "react-redux";
import { setRouter } from "../../store/router-slice";
import styles from "./styles.module.css";

export default function Manager() {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === "martyRocks") {
      dispatch(setRouter({ id: "manager-select" }));
    }
  };
  return (
    <form className={styles.managerPage} onSubmit={handleSubmit}>
      <h3>Please enter the password</h3>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
}
