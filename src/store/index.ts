import { configureStore } from "@reduxjs/toolkit";
import dialog, { DialogType } from "./dialog-slice";
import userRole, { UserRole } from "./user-role-slice";
import routerSlice, { RouterType } from "./router-slice";
import questionnaire, { QuestionnaireType } from "./questionnaire-slice";

export interface IRootState {
  dialog: DialogType;
  userRole: UserRole;
  routerSlice: RouterType;
  questionnaire: QuestionnaireType;
}

const rootReducer = {
  dialog,
  userRole,
  routerSlice,
  questionnaire,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
