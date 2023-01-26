import { createSlice } from "@reduxjs/toolkit";
import EMPTY_PROJECT, {
  empty_msg,
  empty_option,
  empty_phase,
  empty_qst,
} from "../constants/empty-project";
import { ProjectDbType } from "../interfaces/project";
import randomHashGenerator from "../utils/random-hash-generator";
import { QuestionType } from "./questionnaire-slice";

export type ProjectEditType = ProjectDbType;

const initialState: ProjectEditType = EMPTY_PROJECT;

// project
type SetProjectAction = {
  payload: SetProjectActionPayloadType;
};
export type SetProjectActionPayloadType = ProjectDbType;
// main details
type SetMainDetailsAction = {
  payload: SetMainDetailsActionPayloadType;
};
export type SetMainDetailsActionPayloadType = {
  name: string;
  value: string;
};
// remove phase
type RemovePhaseAction = {
  payload: RemovePhaseActionPayloadType;
};
export type RemovePhaseActionPayloadType = {
  index: number;
};
// add instruction msg
type AddInstructionMsgAction = {
  payload: AddInstructionMsgActionPayloadType;
};
export type AddInstructionMsgActionPayloadType = {
  phaseIdx: number;
};
// remove instruction msg
type RemoveInstructionMsgAction = {
  payload: RemoveInstructionMsgActionPayloadType;
};
export type RemoveInstructionMsgActionPayloadType = {
  phaseIdx: number;
  msgIdx: number;
};
// change instruction header
type ChangeInstructionHeaderAction = {
  payload: ChangeInstructionHeaderActionPayloadType;
};
export type ChangeInstructionHeaderActionPayloadType = {
  phaseIdx: number;
  header: string;
};
// change instruction Msg
type ChangeInstructionMsgAction = {
  payload: ChangeInstructionMsgActionPayloadType;
};
export type ChangeInstructionMsgActionPayloadType = {
  phaseIdx: number;
  msgIdx: number;
  msg: string;
};
// change instruction type
type ChangeInstructionTypeAction = {
  payload: ChangeInstructionTypeActionPayloadType;
};
export type ChangeInstructionTypeActionPayloadType = {
  phaseIdx: number;
  msgIdx: number;
  type: string;
};
// change questionnaire type
type ChangeQuestionnaireHeaderAction = {
  payload: ChangeQuestionnaireHeaderActionPayloadType;
};
export type ChangeQuestionnaireHeaderActionPayloadType = {
  phaseIdx: number;
  header: string;
};

type AddQuestionnaireQstnAction = {
  payload: AddQuestionnaireQstnActionPayloadType;
};
export type AddQuestionnaireQstnActionPayloadType = {
  phaseIdx: number;
};

type RemoveQuestionnaireQstnAction = {
  payload: RemoveQuestionnaireQstnActionPayloadType;
};
export type RemoveQuestionnaireQstnActionPayloadType = {
  phaseIdx: number;
  qstnIdx: number;
};

type ChangeQuestionnaireQstnAction = {
  payload: ChangeQuestionnaireQstnActionPayloadType;
};
export type ChangeQuestionnaireQstnActionPayloadType = {
  phaseIdx: number;
  qstnIdx: number;
  qstn: string;
};

type ChangeQuestionnaireTypeAction = {
  payload: ChangeQuestionnaireTypeActionPayloadType;
};
export type ChangeQuestionnaireTypeActionPayloadType = {
  phaseIdx: number;
  qstnIdx: number;
  type: string;
};

type ChangeQuestionnaireQstnOptionAction = {
  payload: ChangeQuestionnaireQstnOptionActionPayloadType;
};
export type ChangeQuestionnaireQstnOptionActionPayloadType = {
  phaseIdx: number;
  qstnIdx: number;
  optionIdx: number;
  option: string;
};

type AddQuestionnaireQstnOptionAction = {
  payload: AddQuestionnaireQstnOptionActionPayloadType;
};
export type AddQuestionnaireQstnOptionActionPayloadType = {
  phaseIdx: number;
  qstnIdx: number;
};

type RemoveQuestionnaireQstnOptionAction = {
  payload: RemoveQuestionnaireQstnOptionActionPayloadType;
};
export type RemoveQuestionnaireQstnOptionActionPayloadType = {
  phaseIdx: number;
  qstnIdx: number;
  optionIdx: number;
};

export const ProjectEditSlice = createSlice({
  name: "ProjectEdit",
  initialState,
  reducers: {
    setNewProject(state) {
      state = EMPTY_PROJECT;
    },
    setProject(state, action: SetProjectAction) {
      const newProject = action.payload;
      state.description = newProject.description;
      state.name = newProject.name;
      state.phases = newProject.phases;
      state.url = newProject.url;
      state.id = newProject.id;
    },
    setMainDetails(state, action: SetMainDetailsAction) {
      const { name, value } = action.payload;
      if (name === "name") {
        state.id = value.trim() + " " + randomHashGenerator();
      }
      state[name] = value;
    },
    addPhase(state) {
      state.phases.push(empty_phase);
    },
    removePhase(state, action: RemovePhaseAction) {
      const { index } = action.payload;
      state.phases.splice(index, 1);
    },
    addInstructionMsg(state, action: AddInstructionMsgAction) {
      const { phaseIdx } = action.payload;
      state.phases[phaseIdx].instructions.msgs.push(empty_msg);
    },
    removeInstructionMsg(state, action: RemoveInstructionMsgAction) {
      const { phaseIdx, msgIdx } = action.payload;
      state.phases[phaseIdx].instructions.msgs.splice(msgIdx, 1);
    },
    changeInstructionHeader(state, action: ChangeInstructionHeaderAction) {
      const { phaseIdx, header } = action.payload;
      state.phases[phaseIdx].instructions.header = header;
    },
    changeInstructionMsg(state, action: ChangeInstructionMsgAction) {
      const { phaseIdx, msgIdx, msg } = action.payload;
      state.phases[phaseIdx].instructions.msgs[msgIdx].msg = msg;
    },
    changeInstructionType(state, action: ChangeInstructionTypeAction) {
      const { phaseIdx, msgIdx, type } = action.payload;
      state.phases[phaseIdx].instructions.msgs[msgIdx].type = type;
    },
    changeQuestionnaireHeader(state, action: ChangeQuestionnaireHeaderAction) {
      const { phaseIdx, header } = action.payload;
      state.phases[phaseIdx].questionnaire.header = header;
    },
    addQuestionnaireQstn(state, action: AddQuestionnaireQstnAction) {
      const { phaseIdx } = action.payload;
      state.phases[phaseIdx].questionnaire.qstns.push(empty_qst);
    },
    removeQuestionnaireQstn(state, action: RemoveQuestionnaireQstnAction) {
      const { phaseIdx, qstnIdx } = action.payload;
      state.phases[phaseIdx].questionnaire.qstns.splice(qstnIdx, 1);
    },
    changeQuestionnaireQstn(state, action: ChangeQuestionnaireQstnAction) {
      const { phaseIdx, qstnIdx, qstn } = action.payload;
      state.phases[phaseIdx].questionnaire.qstns[qstnIdx].question = qstn;
    },
    changeQuestionnaireType(state, action: ChangeQuestionnaireTypeAction) {
      const { phaseIdx, qstnIdx, type } = action.payload;
      state.phases[phaseIdx].questionnaire.qstns[
        qstnIdx
      ].type = type as QuestionType;
    },
    changeQuestionnaireQstnOption(
      state,
      action: ChangeQuestionnaireQstnOptionAction
    ) {
      const { phaseIdx, qstnIdx, optionIdx, option } = action.payload;
      if (!state.phases[phaseIdx].questionnaire.qstns[qstnIdx].options) {
        state.phases[phaseIdx].questionnaire.qstns[qstnIdx].options = [
          empty_option,
        ];
      }
      state.phases[phaseIdx].questionnaire.qstns[qstnIdx].options![
        optionIdx
      ].id = optionIdx.toString();
      state.phases[phaseIdx].questionnaire.qstns[qstnIdx].options![
        optionIdx
      ].text = option;
    },
    addQuestionnaireQstnOption(state, action: AddQuestionnaireQstnOptionAction) {
      const { phaseIdx, qstnIdx } = action.payload;
      if (!state.phases[phaseIdx].questionnaire.qstns[qstnIdx].options) {
        state.phases[phaseIdx].questionnaire.qstns[qstnIdx].options = [
          empty_option,
        ];
      } else {
        state.phases[phaseIdx].questionnaire.qstns[qstnIdx].options!.push(
          empty_option
        );
      }
    },
    removeQuestionnaireQstnOption(
      state,
      action: RemoveQuestionnaireQstnOptionAction
    ) {
      const { phaseIdx, qstnIdx, optionIdx } = action.payload;
      state.phases[phaseIdx].questionnaire.qstns[qstnIdx].options!.splice(
        optionIdx,
        1
      );
    },
  },
});

export const {
  setProject,
  setMainDetails,
  addPhase,
  removePhase,
  addInstructionMsg,
  removeInstructionMsg,
  changeInstructionMsg,
  changeInstructionType,
  changeInstructionHeader,
  changeQuestionnaireHeader,
  addQuestionnaireQstn,
  removeQuestionnaireQstn,
  changeQuestionnaireQstn,
  changeQuestionnaireType,
  changeQuestionnaireQstnOption,

  addQuestionnaireQstnOption,
  removeQuestionnaireQstnOption,
  setNewProject
} = ProjectEditSlice.actions;

export default ProjectEditSlice.reducer;
