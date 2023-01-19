import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
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
import Question from "../questionnaire/Question";
import { currentPhase, setAnswers, setCurrentPhase } from "../../store/session-slice";
import { AnswerType } from "../../interfaces/answers";
import { areAllQuestionsAnswered } from "../../utils/answers";

const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function QuestionnaireModal() {
  const dispatch = useDispatch();
  const { questionnaire, sessionSlice } = useSelector((state: IRootState) => ({
    ...state,
  }));

  React.useEffect(() => {
    // this is where the tester's starting the questionnaire
    // prepopulate answers
    if (questionnaire.qstns && questionnaire.qstns.length > 0) {
      const answrs: AnswerType[] = questionnaire.qstns.map((question) => {
        return {
          question: question,
          sessionId: sessionSlice.id,
          answer: "",
          type: question.type,
        } as AnswerType;
      });
      dispatch(setAnswers({ answers: answrs }));
    }
  }, [questionnaire.show]);

  const handleClose = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown" | "closeClick"
  ) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    if (
      !areAllQuestionsAnswered(sessionSlice.phases[currentPhase].questionnaire.answers || [])
    ) {
      // if not all questions are answered return
      alert("Please answer all questions");
      return;
    }

    if (questionnaire.next) {
      if (questionnaire.next.type === "dialog") {
        dispatch(hideQuestionnaire({}));
        dispatch(
          showDialog(questionnaire.next.next as DialogActionPayloadType)
        );
      } else if (questionnaire.next.type === "questionnaire") {
        dispatch(
          showQuestionnaire(
            questionnaire.next.next as QuestionnaireActionPayloadType
          )
        );
      }
    } else {
      dispatch(hideQuestionnaire({}));
    }
    setCurrentPhase(currentPhase + 1);
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
              <Question key={i} question={question} questionIdx={i} />
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
