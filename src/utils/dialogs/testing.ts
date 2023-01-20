import store from "../../store";
import { DialogActionPayloadType } from "../../store/dialog-slice";

export const generalTestInstructionsDialog = (
  projectName: string,
  next: DialogActionPayloadType
): DialogActionPayloadType => {
  return {
    header: `Welcome to the testing of the ${projectName} project!`,
    msgs: [
      {
        msg: `These instructions will guide you through the testing process. Please read them carefully before starting the testing.`,
        type: "info",
      },
      {
        msg: `After you read the instructions, you can start testing by pressing the 'Next' button on the testing menu. The testing menu is located on the top of the page and includes an arrow button that can be used to hide/show the menu, an 'Info' button that contains information for the current scenario, and a 'Next' button to navigate to the next scenario.`,
        type: "info",
      },
      {
        msg: `Information for each testing scenario will be presented at the beginning of each testing phase. You can also revisit the information by pressing the 'Info' button on the testing menu.`,
        type: "info",
      },
      {
        msg: `When you finish testing a given scenario, press the 'Next' button to move on to the questionnaire for that scenario. Please make sure to fill out the questionnaire completely before moving on to the next scenario.`,
        type: "info",
      },
      {
        msg: `At the end of the testing session, you will receive a session ID. This can be used to refer to your testing session in the future.`,
        type: "info",
      },
    ],
    next,
  };
};

export const thankingDialog = (): DialogActionPayloadType => {
  const sessionId = store.getState().sessionSlice.id;
  return {
    header: "Thank you for your participation!",
    msgs: [
      {
        msg: `Thank you for your participation! Please take a note of your session id ${sessionId}. If for any reason you'd like to refer to your testing session you'll need to let us know this id.`,
        type: "success",
      },
    ],
  };
};
