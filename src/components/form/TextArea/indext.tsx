import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { QuestionOptionsType } from "../../../store/questionnaire-slice";
import { currentPhase } from "../../../store/session-slice";

interface TextAreaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  question: string;
  answerIdx: number;
}

export default function TextArea({
  onChange,
  question,
  answerIdx,
  ...rest
}: TextAreaProps) {
  const { sessionSlice } = useSelector((state: IRootState) => ({ ...state }));
  const currentValue =
    sessionSlice.phases[currentPhase].questionnaire.answers?.[answerIdx]
      ?.answer;
  return (
    <div className={styles.textarea}>
      <label htmlFor={answerIdx+question} className={styles.textarea_label}>
        {answerIdx+1}) {question}
      </label>
      <textarea
        id={answerIdx+question}
        className={styles.textarea_text}
        {...rest}
        onChange={onChange}
      >
        {currentValue}
      </textarea>
    </div>
  );
}
