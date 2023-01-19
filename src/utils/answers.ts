import { AnswerType } from "../interfaces/answers";

export function areAllQuestionsAnswered(answers: AnswerType[]) {
  let allAnswered = true;
  if (!answers) return false;
  answers.forEach((answer) => {
    if (answer.type === "likert" && !answer.answer) {
      allAnswered = false;
    }
  });
  return allAnswered;
}
