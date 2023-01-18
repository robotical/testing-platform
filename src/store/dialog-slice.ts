import { createSlice } from "@reduxjs/toolkit";

export type DialogType = {
  show: boolean;
  header: string;
  msgs: { type: string; msg: string }[];
  next?: DialogActionPayloadType;
};

const initialState: DialogType = {
  show: false,
  header: "",
  msgs: [],
};

type ShowDialogActionType = {
  payload: DialogActionPayloadType;
};

export type DialogActionPayloadType = {
  header: string;
  msgs: { type: string; msg: string }[];
  next?: DialogActionPayloadType;
};

export const DialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    showDialog(state, action: ShowDialogActionType) {
      state.show = true;
      state.header = action.payload.header;
      state.msgs = action.payload.msgs;
      state.next = action.payload.next;
    },
    hideDialog(state, action) {
      state.show = false;
      state.header = "";
      state.msgs = [];
      state.next = undefined;
    },
  },
});

export const { showDialog, hideDialog } = DialogSlice.actions;

export default DialogSlice.reducer;
