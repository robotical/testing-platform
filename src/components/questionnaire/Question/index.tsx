import { useDispatch } from "react-redux";
import { QstnsType } from "../../../store/questionnaire-slice";
import { setAnswer } from "../../../store/session-slice";
import Likert from "../../form/Likert";
import TextArea from "../../form/TextArea/indext";
import styles from "./styles.module.css";

type QuestionProps = {
  question: QstnsType;
  questionIdx: number;
};

export default function Question({ question, questionIdx }: QuestionProps) {
  const dispatch = useDispatch();

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setAnswer({ answer: e.target.value, answerIdx: questionIdx }));
  };

  let questionTypeJSX;
  switch (question.type) {
    case "text":
      questionTypeJSX = (
        <TextArea
          question={question.question}
          onChange={handleQuestionChange}
          answerIdx={questionIdx}
        />
      );
      break;
    case "likert":
      questionTypeJSX = (
        <Likert
          question={question.question}
          options={question.options}
          onChange={handleQuestionChange}
          answerIdx={questionIdx}
        />
      );
      break;
    default:
      questionTypeJSX = <div>Unknown</div>;
  }
  return <div className={styles.question}>{questionTypeJSX}</div>;
}
