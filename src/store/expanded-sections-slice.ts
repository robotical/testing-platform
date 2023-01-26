import { createSlice } from "@reduxjs/toolkit";

export type ExpandedSectionsType = {
  expanded: string[];
};

const initialState: ExpandedSectionsType = {
  expanded: [],
};

type AddExpandedSectionAction = {
  payload: AddExpandedSectionActionPayloadType;
};
export type AddExpandedSectionActionPayloadType = string;

type RemoveExpandedSectionAction = {
  payload: RemoveExpandedSectionActionPayloadType;
};
export type RemoveExpandedSectionActionPayloadType = string;

export const ExpandedSectionsSlice = createSlice({
  name: "ExpandedSections",
  initialState,
  reducers: {
    addExpandedSection(state, action: AddExpandedSectionAction) {
      const updatedExpanded = [...state.expanded];
      updatedExpanded.push(action.payload);
      state.expanded = updatedExpanded;
    },
    removeExpandedSection(state, action: RemoveExpandedSectionAction) {
      state.expanded = state.expanded.filter(
        (section) => section !== action.payload
      );
    },
    resetExpandedSections(state) {
      state.expanded = [];
    }
  },
});

export const {
  addExpandedSection,
  removeExpandedSection,
  resetExpandedSections
} = ExpandedSectionsSlice.actions;

export default ExpandedSectionsSlice.reducer;
