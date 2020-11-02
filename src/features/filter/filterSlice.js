import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  titleFilter: "",
  statusFilter: "",
  sortMethod: "asc",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    titleFilterChanged: (state, action) => {
      state.titleFilter = action.payload;
    },
    statusFilterChanged: (state, action) => {
      state.statusFilter = action.payload;
    },
    sortMethodChanged: (state, action) => {
      state.sortMethod = action.payload;
    },
  },
});

export const {
  titleFilterChanged,
  statusFilterChanged,
  sortMethodChanged,
} = filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.titleFilter;
export const selectStatusFilter = (state) => state.filter.statusFilter;
export const selectSortMethod = (state) => state.filter.sortMethod;

export default filterSlice.reducer;
