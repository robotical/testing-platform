import { DialogActionPayloadType } from "../../store/dialog-slice";
import {
  QuestionnaireActionPayloadType,
  QuestionnaireNextEnum,
} from "../../store/questionnaire-slice";

export const generalTestInstructionsDialog = (
  projectName: string,
  next: DialogActionPayloadType
): DialogActionPayloadType => {
  return {
    header: `Welcome to the testing of the ${projectName} project!`,
    msgs: [
      {
        msg: `This is a test of the ${projectName} project. You will be shown a series of test scenarios and asked to answer questions about them.`,
        type: "info",
      },
      {
        msg: `To go to the next test scenario, click the "Next" button on the Testing menu --top right corner of your screen.`,
        type: "info",
      },
      {
        msg: `The info of each test scenario will be presented at the beginning of each scenario, but you could also revisit them by pressing the 'Info' button on the Testing menu.`,
        type: "info",
      },
    ],
    next,
  };
};

export const finalQuestionnaire = (): QuestionnaireActionPayloadType => {
  return {
    header: "Final Questionnaire",
    qstns: [
      {
        type: "likert",
        question: "How much did you enjoy the testing?",
      },
    ],
    next: { type: QuestionnaireNextEnum.DIALOG, next: thankingDialog() },
  };
};

export const thankingDialog = (): DialogActionPayloadType => {
  return {
    header: "Thank you for your participation!",
    msgs: [
      {
        msg: `Thank you for your participation!`,
        type: "success",
      },
    ],
  };
};
