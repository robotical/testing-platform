import { createSlice } from "@reduxjs/toolkit";
import store from ".";
import DatabaseManager from "../db/DatabaseManager";
import { AnswerType } from "../interfaces/answers";
import { PhaseType } from "../interfaces/project";
import randomHash from "../utils/random-hash-generator";

export let currentPhase = 0;
export const setCurrentPhase = (phase: number) => {
  const sessionSlice = store.getState().sessionSlice;
  const phasesLength = sessionSlice.phases.length;
  if (phase >= phasesLength) {
    store.dispatch(endSession({}));
  }
  currentPhase = phase;
};

export type SessionType = {
  id: string;
  project: string;
  startTime: string;
  endTime: string;
  durationInMins: number;
  phases: PhaseType[];
  finished: boolean;
};

const initialState: SessionType = {
  id: "",
  project: "",
  startTime: JSON.stringify(new Date()),
  endTime: JSON.stringify(new Date()),
  durationInMins: 0,
  phases: [],
  finished: false,
};

type StartSessionAction = {
  payload: StartSessionPayload;
};

export type StartSessionPayload = {
  phases: PhaseType[];
  project: string;
};

type SetAnswersAction = {
  payload: SetAnswersPayload;
};

export type SetAnswersPayload = {
  answers: AnswerType[];
};

type SetAnswerAction = {
  payload: SetAnswerPayload;
};

export type SetAnswerPayload = {
  answer: string;
  answerIdx: number;
};

export const SessionSlice = createSlice({
  name: "Session",
  initialState,
  reducers: {
    startSession(state, action: StartSessionAction) {
      currentPhase = 0;
      state.project = action.payload.project;
      state.startTime = JSON.stringify(new Date());
      state.id = randomHash();
      state.phases = JSON.parse(JSON.stringify(action.payload.phases));
      state.phases[0].questionnaire.answers = [];
    },
    endSession(state, action) {
      state.endTime = JSON.stringify(new Date());
      const parsedStartTime = new Date(JSON.parse(state.startTime));
      const parsedEndTime = new Date(JSON.parse(state.endTime));
      state.durationInMins = (parsedEndTime.getTime() - parsedStartTime.getTime()) / 1000 / 60;
      state.finished = true;
      DatabaseManager.saveSession(state);
    },
    setAnswers(state, action: SetAnswersAction) {
      if (!state.phases[currentPhase].questionnaire.answers) {
        state.phases[currentPhase].questionnaire.answers = [];
      }
      state.phases[currentPhase].questionnaire.answers = action.payload.answers;
    },

    setAnswer(state, action: SetAnswerAction) {
      const answerIdx = action.payload.answerIdx;
      state.phases[currentPhase].questionnaire.answers![answerIdx].answer =
        action.payload.answer;
    },
  },
});

export const {
  startSession,
  endSession,
  setAnswers,
  setAnswer,
} = SessionSlice.actions;

export default SessionSlice.reducer;
