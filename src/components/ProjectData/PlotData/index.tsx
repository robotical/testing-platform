import BarGraph from "../../displaying-data/LikertScale";
import TextWithTitle from "../../displaying-data/TextField";
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
          text={answerData.answer as string[]}
          sessionIds={answerData.sessionId as string[]}
        />
      );
      break;
    case "likert":
    case "multiple":
      displayDataJSX = (
        <BarGraph
          sessionIds={answerData.sessionId as string[]}
          answers={answerData.answer as string[]}
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
