import { AnswerType } from "../../interfaces/answers";

export const stringAnswerToArray = (answer: AnswerType): AnswerType => {
  return {
    sessionId: answer.sessionId,
    question: JSON.parse(JSON.stringify(answer.question)),
    answer: [answer.answer as string],
    type: answer.type,
  };
};

export const stringIdToArray = (answer: AnswerType): AnswerType => {
  return {
    sessionId: [answer.sessionId as string],
    question: JSON.parse(JSON.stringify(answer.question)),
    answer: answer.answer,
    type: answer.type,
  };
}
