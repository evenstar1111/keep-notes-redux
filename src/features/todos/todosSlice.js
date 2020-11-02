import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../app/apiRequests";
import { apiEndpoint } from "../../config";

const initialState = {
  todos: [],
  status: "idle",
  error: "",
  todoCreation: {
    status: "idle",
    error: "",
    success: "",
  },
  todoEdition: {
    status: "",
    error: "",
    success: "",
  },
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await api.get("/api/todos");
  return res;
});

export const createTodo = createAsyncThunk("todos/createTodo", async (body) => {
  const res = await api.sendTo("/api/todos/create", "post", body);
  return res;
});

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async (body, { dispatch }) => {
    dispatch(todoUpdated(body));
    const res = await api.sendTo("/api/todos/update", "put", body);
    return res;
  }
);

export const deleteTodoAction = createAsyncThunk(
  "todos/deleteTodo",
  async (body, { dispatch }) => {
    dispatch(todoDeleted(body));
    const res = api.sendTo("/api/todos/delete", "delete", body);
    return res;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoUpdated: (state, action) => {
      const { _id: todoId, title, description, label, status } = action.payload;
      const existingTodo = state.todos.find((todo) => todo._id === todoId);
      if (existingTodo) {
        existingTodo.title = title;
        existingTodo.description = description;
        existingTodo.label = label;
        existingTodo.status = status;
      }
    },
    todoDeleted: (state, action) => {
      const { id: todoId } = action.payload;
      state.todos = state.todos.filter((todo) => todo._id !== todoId);
    },
    clearTodoCreation: (state) => {
      state.todoCreation.status = "";
      state.todoCreation.error = "";
      state.todoCreation.success = "";
    },
    clearTodoEdition: (state) => {
      state.todoEdition.status = "";
      state.todoEdition.error = "";
      state.todoEdition.success = "";
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchTodos.fulfilled]: (state, action) => {
      if (action.payload.error) {
        state.status = "failed";
        state.error = action.payload.error;
      } else {
        state.status = "ready";
        state.todos = state.todos.concat(action.payload);
      }
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [createTodo.pending]: (state, action) => {
      state.todoCreation.status = "loading";
    },
    [createTodo.rejected]: (state, action) => {
      state.todoCreation.status = "failed";
      state.todoCreation.error = action.error.message;
    },
    [createTodo.fulfilled]: (state, action) => {
      let ap = action.payload;
      if (ap.error) {
        state.todoCreation.error = ap.error;
        state.todoCreation.status = "failed";
      } else {
        state.todoCreation.status = "success";
        state.todos.push(ap.todo);
      }
    },
    [editTodo.pending]: (state, action) => {
      state.todoEdition.status = "loading";
    },
    [editTodo.rejected]: (state, action) => {
      state.todoEdition.status = "failed";
      state.todoEdition.error = action.error.message;
    },
    [editTodo.fulfilled]: (state, action) => {
      const pl = action.payload;
      if (pl.error) {
        state.todoEdition.status = "failed";
        state.todoEdition.error = pl.error;
      } else {
        state.todoEdition.status = "succeeded";
        state.todoEdition.success = "saved!";
      }
    },
  },
});

export const {
  todoUpdated,
  todoDeleted,
  clearTodoCreation,
  clearTodoEdition,
} = todosSlice.actions;

export const selectAllTodos = (state) => state.todos.todos;
export const findTodoById = (state, todoId) =>
  state.todos.todos.find((todo) => todo._id === todoId);
export const selectStatus = (state) => state.todos.status;
export const reqStatus = (state) => state.todos.todoCreation.status;
export const createTodoError = (state) => state.todos.todoCreation.error;
export const editTodoStatus = (state) => state.todos.todoEdition.status;
export const editTodoError = (state) => state.todos.todoEdition.error;
export const editTodoSuccess = (state) => state.todos.todoEdition.success;

export default todosSlice.reducer;
