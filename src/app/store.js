import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";
import filterReducer from "../features/filter/filterSlice";
import topCollapseExpandedStatusReducer from "../features/topCollapse/topCollapseExpandedStatusSlice"

export default configureStore({
  reducer: {
    todos: todosReducer,
    filter: filterReducer,
    topCollapse: topCollapseExpandedStatusReducer
  },
});
