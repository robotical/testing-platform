import { QstnsType, QuestionType } from "../store/questionnaire-slice";

export type AnswerType = {
    sessionId: string | string[];
    question: QstnsType;
    answer: string | string[];
    type: QuestionType;
}
