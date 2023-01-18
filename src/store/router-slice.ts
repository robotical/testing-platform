import { createSlice } from "@reduxjs/toolkit";
import { RouteIdType } from "../pages/router";

export type RouterType = {
  currentRoute: {
    id: RouteIdType;
    props?: any;
  }
};

const initialState: RouterType = {
  currentRoute: {
    id: "landing-page",
    props: {},
  },
};

type SetRouterActionType = {
  payload: {
    id: RouteIdType;
    props?: any;
  };
};

export const RouterSlice = createSlice({
  name: "Router",
  initialState,
  reducers: {
    setRouter(state, action: SetRouterActionType) {
      state.currentRoute = action.payload;
    },
  },
});

export const { setRouter } = RouterSlice.actions;

export default RouterSlice.reducer;
