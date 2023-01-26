import { useDispatch } from "react-redux";
import { RouteIdType } from "../../pages/router";
import { setRouter } from "../../store/router-slice";
import styles from "./styles.module.css";

type GoBackProps = {
  backTo: RouteIdType;
  children: React.ReactNode | React.ReactNode[];
};

export default function GoBack({ backTo, children }: GoBackProps) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setRouter({ id: backTo }));
  };

  return (
    <>
      <button className={styles.go_back_btn} onClick={handleClick}>
        {"<- Go back"}
      </button>
      {children}
    </>
  );
}
