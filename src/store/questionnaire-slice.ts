import { createSlice } from "@reduxjs/toolkit";
import { AnswerType } from "../interfaces/answers";
import { DialogActionPayloadType } from "./dialog-slice";

export type QuestionType = "likert" | "text" | "multiple";

export type QuestionOptionsType = {
  id: string;
  text: string;
};

export type QstnsType = {
  type: QuestionType;
  question: string;
  options?: QuestionOptionsType[];
};

export enum QuestionnaireNextEnum {
  DIALOG = "dialog",
  QUESTIONNAIRE = "questionnaire",
}

export type QuestionnaireType = {
  show: boolean;
  header: string;
  qstns: QstnsType[];
  next?: { type: QuestionnaireNextEnum; next: DialogActionPayloadType | QuestionnaireActionPayloadType };
};

const initialState: QuestionnaireType = {
  show: false,
  header: "",
  qstns: [],
};

type QhowquestionnaireActionType = {
  payload: QuestionnaireActionPayloadType;
};

export type QuestionnaireActionPayloadType = {
  header: string;
  qstns: QstnsType[];
  answers?: AnswerType[];
  next?: { type: QuestionnaireNextEnum; next: DialogActionPayloadType | QuestionnaireActionPayloadType };
};

export const QuestionnaireSlice = createSlice({
  name: "Questionnaire",
  initialState,
  reducers: {
    showQuestionnaire(state, action: QhowquestionnaireActionType) {
      state.show = true;
      state.header = action.payload.header;
      state.qstns = action.payload.qstns;
      state.next = action.payload.next;
    },
    hideQuestionnaire(state, action) {
      state.show = false;
      state.header = "";
      state.qstns = [];
      state.next = undefined;
    },
  },
});

export const {
  hideQuestionnaire,
  showQuestionnaire,
} = QuestionnaireSlice.actions;

export default QuestionnaireSlice.reducer;
