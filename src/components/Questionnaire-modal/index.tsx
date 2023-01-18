import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useSelector, useDispatch } from "react-redux";
import {
  hideQuestionnaire,
  QuestionnaireActionPayloadType,
  showQuestionnaire,
} from "../../store/questionnaire-slice";
import styles from "./styles.module.css";
import { IRootState } from "../../store";
import { DialogActionPayloadType, showDialog } from "../../store/dialog-slice";

const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function QuestionnaireModal() {
  const dispatch = useDispatch();
  const { questionnaire } = useSelector((state: IRootState) => ({ ...state }));

  const handleClose = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown" | "closeClick"
  ) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    if (questionnaire.next) {
      if (questionnaire.next.type === "dialog") {
        dispatch(hideQuestionnaire({}));
        dispatch(showDialog(questionnaire.next.next as DialogActionPayloadType));
      } else if (questionnaire.next.type === "questionnaire") {
        dispatch(showQuestionnaire(questionnaire.next.next as QuestionnaireActionPayloadType));
      }
    } else {
      dispatch(hideQuestionnaire({}));
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        zIndex: "999999999999999",
      }}
    >
      <Dialog
        open={questionnaire.show}
        // @ts-ignore
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        disableScrollLock={true}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
      >
        <DialogTitle className={`${styles.header} ${styles.dialog_info}`}>
          {questionnaire.header}
        </DialogTitle>
        <DialogContent className={styles.body}>
          {questionnaire.qstns &&
            questionnaire.qstns.map((question, i) => (
              <DialogContentText
                className={styles.question}
                id="alert-dialog-slide-description"
                key={i}
              >
                <span>{question.question}</span>
                {question.options &&
                  question.options.map((option, j) => (
                    <span key={option.id + j}>{option.text}</span>
                  ))}
              </DialogContentText>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose({}, "closeClick")}>
            {questionnaire.next ? "Next" : "Close"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
