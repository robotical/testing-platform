import { AnswerToPlotType, AnswerType } from "../../interfaces/answers";

export const answerToPlotData = (answer: AnswerType): AnswerToPlotType => {
  return {
    sessionId: answer.sessionId,
    question: JSON.parse(JSON.stringify(answer.question)),
    answer: [answer.answer],
    type: answer.type,
  };
};
