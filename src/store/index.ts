import { configureStore } from "@reduxjs/toolkit";
import dialog, { DialogType } from "./dialog-slice";
import userRole, { UserRole } from "./user-role-slice";
import routerSlice, { RouterType } from "./router-slice";
import questionnaire, { QuestionnaireType } from "./questionnaire-slice";
import sessionSlice, { SessionType } from "./session-slice";

export interface IRootState {
  dialog: DialogType;
  userRole: UserRole;
  routerSlice: RouterType;
  questionnaire: QuestionnaireType;
  sessionSlice: SessionType;
}

const rootReducer = {
  dialog,
  userRole,
  routerSlice,
  questionnaire,
  sessionSlice,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
