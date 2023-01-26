import { AnswerType } from "../interfaces/answers";
import { ProjectDbType } from "../interfaces/project";
import {
  QuestionType,
  QstnsType,
  QuestionOptionsType,
} from "../store/questionnaire-slice";
import DEFAULT_OPTIONS from "../utils/likert-fallback-values";

export const empty_msg = {
  msg: "",
  type: "info",
};

export const empty_option: QuestionOptionsType = {
  id: "",
  text: "",
};

export const empty_qst: QstnsType = {
  question: "",
  type: "likert" as QuestionType,
  options: DEFAULT_OPTIONS,
};

export const empty_answer: AnswerType = {
  question: empty_qst,
  sessionId: "",
  type: "" as QuestionType,
  answer: "",
};

export const empty_phase = {
  instructions: { header: "", msgs: [empty_msg] },
  questionnaire: {
    header: "",
    qstns: [empty_qst],
    answers: [empty_answer],
  },
};

const EMPTY_PROJECT: ProjectDbType = {
  id: "",
  name: "",
  description: "",
  phases: [empty_phase],
  url: "",
};

export default EMPTY_PROJECT;
