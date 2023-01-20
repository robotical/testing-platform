import { QuestionOptionsType } from "../../../store/questionnaire-slice";
import styles from "./styles.module.css";

export type MultipleChoiceProps = {
    question: string;
    options: QuestionOptionsType[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    answerIdx: number;
};

export default function MultipleChoice({
    question,
    options,
    onChange,
    answerIdx,
}: MultipleChoiceProps) {
    return (
        <div className={styles.multipleChoice}>
            <div className={styles.question}>{answerIdx}) {question}</div>
            <div className={styles.options}>
                {options.map((option, idx) => (
                    <div key={idx} className={styles.option}>
                        <input
                            id={`${answerIdx}-${option.id}-${option.text}`}
                            type="checkbox"
                            name={`question-${answerIdx}`}
                            value={option.text}
                            onChange={onChange}
                        />
                        <label htmlFor={`${answerIdx}-${option.id}-${option.text}`}>{option.text}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}