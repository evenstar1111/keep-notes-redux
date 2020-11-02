import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expanded: true,
};

const topCollapseExpandedStatusSlice = createSlice({
  name: "topCollapseExpandedStatus",
  initialState,
  reducers: {
    changedExpandedStatus: (state, action) => {
      state.expanded = action.payload;
    },
  },
});

export const { changedExpandedStatus } = topCollapseExpandedStatusSlice.actions;

export const selectExpandedStatus = (state) => state.topCollapse.expanded;

export default topCollapseExpandedStatusSlice.reducer;
