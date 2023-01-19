import { useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { QuestionOptionsType } from "../../../store/questionnaire-slice";
import { currentPhase } from "../../../store/session-slice";
import RadioButton from "../RadioButton";
import styles from "./styles.module.css";
import DEFAULT_OPTIONS from "../../../utils/likert-fallback-values";

interface LikertProps {
  question: string;
  options: QuestionOptionsType[] | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  answerIdx: number;
}


export default function Likert({
  question,
  options,
  onChange,
  answerIdx,
}: LikertProps) {
  const { sessionSlice } = useSelector((state: IRootState) => ({ ...state }));

  const finalOptionsArray = options ? options : DEFAULT_OPTIONS;

  const optionsJSX = finalOptionsArray.map((option, idx) => {
    const isChecked =
      sessionSlice.phases[currentPhase]?.questionnaire.answers?.[answerIdx]
        ?.answer === option.text;
    return (
      <div key={answerIdx + idx} className={styles.likert_option}>
        <RadioButton
          direction="column"
          checked={isChecked}
          label={option.text}
          name={answerIdx+option.text}
          onChange={onChange}
          value={option.text}
        />
      </div>
    );
  });

  return (
    <div className={styles.likert}>
      <div className={styles.likert_question}>{answerIdx+1}) {question}</div>
      <div className={styles.likert_options}>{optionsJSX}</div>
    </div>
  );
}
