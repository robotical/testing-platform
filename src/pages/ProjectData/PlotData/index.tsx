import BarGraph from "../../../components/displaying-data/LikertScale";
import TextWithTitle from "../../../components/displaying-data/TextField";
import { AnswerType } from "../../../interfaces/answers";
import styles from "./styles.module.css";

export type PlotDatProps = {
  answerData: AnswerType;
};

export default function PlotData({ answerData }: PlotDatProps) {
  let displayDataJSX;
  switch (answerData.type) {
    case "text":
      displayDataJSX = (
        <TextWithTitle
          title={answerData.question.question}
          text={answerData.answer as string []}
        />
      );
      break;
    case "likert":
      displayDataJSX = (
        <BarGraph
          answers={answerData.answer as string []}
          categories={answerData.question.options}
          title={answerData.question.question}
        />
      );
      break;
    default:
      displayDataJSX = <div>no data</div>;
  }
  return <div>{displayDataJSX}</div>;
}
