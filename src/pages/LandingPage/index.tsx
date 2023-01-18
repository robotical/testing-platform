import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../../store";
import { setRouter } from "../../store/router-slice";
import { setUserRole, UserRolesEnum } from "../../store/user-role-slice";
import styles from "./styles.module.css";

const LandingPage = () => {
  const userRole = useSelector((state: IRootState) => state.userRole.role);
  const dispatch = useDispatch();

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserRole(e.target.value as UserRolesEnum));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (userRole === 'tester') {
      dispatch(setRouter({ id: "tester-index" }));
    } else {
    //   // router.push('/manager')
    }
  };

  return (
    <div className={styles.landing_page}>
      <h1>Welcome to the Testing Platform</h1>
      <p>Are you a tester or a developer?</p>
      <form>
        <div className={styles.form_group}>
          <div>
            <input
              type="radio"
              value="tester"
              checked={userRole === 'tester'}
              onChange={handleOptionChange}
            />{" "}
            Tester
          </div>
          <div>
            <input
              type="radio"
              value="manager"
              checked={userRole === 'manager'}
              onChange={handleOptionChange}
            />{" "}
            Manager
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

export default LandingPage;
