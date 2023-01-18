import { createSlice } from "@reduxjs/toolkit";

export type UserRolesEnum = "tester" | "manager";
export type UserRole = {
  role: UserRolesEnum;
};

const initialState: UserRole = {
    role: "tester", // everyone starts as a tester, and if they enter the correct pw after they selected manager, they become a manager
};

type SetUserRoleActionType = {
  payload: UserRolesEnum;
};

export const UserRoleSlice = createSlice({
  name: "userRole",
  initialState,
  reducers: {
    setUserRole(state, action: SetUserRoleActionType) {
      state.role = action.payload;
    }
  },
});

export const { setUserRole } = UserRoleSlice.actions;

export default UserRoleSlice.reducer;
