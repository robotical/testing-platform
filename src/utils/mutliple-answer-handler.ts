import { AnswerType } from "../interfaces/answers";

export default function multipleAnswerHandler(
  answer: AnswerType,
  incomingAnswer: string
) {
  if (typeof answer.answer === "string") {
    // if the answer is string, convert it to an array
    answer.answer = [];
    answer.answer.push(incomingAnswer);
  } else {
    // the answer is not empty, so it's an array
    if (answer.answer.includes(incomingAnswer)) {
      // if the answer is already included in the array, remove it
      answer.answer.splice(answer.answer.indexOf(incomingAnswer), 1);
    } else {
      // if the answer is not included in the array, add it
      answer.answer.push(incomingAnswer);
    }
  }
}
