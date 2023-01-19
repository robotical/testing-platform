import { QstnsType, QuestionType } from "../store/questionnaire-slice";

export type AnswerType = {
    sessionId: string;
    question: QstnsType;
    answer: string;
    type: QuestionType;
}

export type AnswerToPlotType = {
    sessionId: string;
    question: QstnsType;
    answer: string[];
    type: QuestionType;
}