import { configureStore } from "@reduxjs/toolkit";
import dialog, { DialogType } from "./dialog-slice";
import userRole, { UserRole } from "./user-role-slice";
import routerSlice, { RouterType } from "./router-slice";
import questionnaire, { QuestionnaireType } from "./questionnaire-slice";
import sessionSlice, { SessionType } from "./session-slice";
import projectEditSlice, { ProjectEditType } from "./project-edit-slice";
import expandedSectionsSlice, {ExpandedSectionsType} from "./expanded-sections-slice";

export interface IRootState {
  dialog: DialogType;
  userRole: UserRole;
  routerSlice: RouterType;
  questionnaire: QuestionnaireType;
  sessionSlice: SessionType;
  projectEditSlice: ProjectEditType;
  expandedSectionsSlice: ExpandedSectionsType;
}

const rootReducer = {
  dialog,
  userRole,
  routerSlice,
  questionnaire,
  sessionSlice,
  projectEditSlice,
  expandedSectionsSlice,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
