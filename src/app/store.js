import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../features/notes/notesSlice";
import filterReducer from "../features/filter/filterSlice";
import topCollapseExpandedStatusReducer from "../features/topCollapse/topCollapseExpandedStatusSlice";

export default configureStore({
  reducer: {
    notes: notesReducer,
    filter: filterReducer,
    topCollapse: topCollapseExpandedStatusReducer,
  },
});
