import React from "react";
import { useDispatch } from "react-redux";
import { setRouter } from "../../store/router-slice";
import styles from "./styles.module.css";

const ManagerSelect = () => {
  const [selectedOption, setSelectedOption] = React.useState<"edit" | "data">("data");
  const dispatch = useDispatch();
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value as "edit" | "data");
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (selectedOption === "data") {
      dispatch(setRouter({ id: "manager-index" }));
    } else {
      dispatch(setRouter({ id: "manager-edit" }));
    }
  };

  return (
    <div className={styles.manager_select}>
      <h1>Manager select</h1>
      <p>Please select what do you want to do:</p>
      <form>
        <div className={styles.form_group}>
          <div>
            <input
              type="radio"
              value="data"
              checked={selectedOption === "data"}
              onChange={handleOptionChange}
            />{" "}
            View data
          </div>
          <div>
            <input
              type="radio"
              value="edit"
              checked={selectedOption === "edit"}
              onChange={handleOptionChange}
            />{" "}
            Edit projects
          </div>
        </div>
        <button
          type="submit"
          className={styles.submit_button}
          onClick={handleSubmit}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default ManagerSelect;
