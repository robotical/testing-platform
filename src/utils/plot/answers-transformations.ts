import { AnswerType } from "../../interfaces/answers";

export const answerToPlotData = (answer: AnswerType): AnswerType => {
  return {
    sessionId: answer.sessionId,
    question: JSON.parse(JSON.stringify(answer.question)),
    answer: [answer.answer as string],
    type: answer.type,
  };
};
