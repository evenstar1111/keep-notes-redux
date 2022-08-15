import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../app/apiRequests";
import { getLocal, setLocal } from "../../helpers/localStorage";

const initialState = {
  notes: [],
  status: "idle",
  error: "",
  noteCreation: {
    status: "idle",
    error: "",
    success: "",
  },
  noteEdition: {
    status: "",
    error: "",
    success: "",
  },
};

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const res = await api.get("/api/notes");
  return res;
});

export const createNote = createAsyncThunk("notes/createNote", async (body) => {
  const res = await api.sendTo("/api/notes/create", "post", body);
  return res;
});

export const editNote = createAsyncThunk(
  "notes/editNote",
  async (body, { dispatch }) => {
    dispatch(noteUpdated(body));
    const res = await api.sendTo("/api/notes/update", "put", body);
    return res;
  }
);

export const deleteNoteAction = createAsyncThunk(
  "notes/deleteNote",
  async (body, { dispatch }) => {
    dispatch(noteDeleted(body));
    const res = api.sendTo("/api/notes/delete", "delete", body);
    return res;
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    noteUpdated: (state, action) => {
      const { _id: noteId, title, description, label, status } = action.payload;
      const existingNote = state.notes.find((note) => note._id === noteId);
      if (existingNote) {
        existingNote.title = title;
        existingNote.description = description;
        existingNote.label = label;
        existingNote.status = status;
      }
    },
    noteDeleted: (state, action) => {
      const { id: noteId } = action.payload;
      state.notes = state.notes.filter((note) => note._id !== noteId);
    },
    clearNoteCreation: (state) => {
      state.noteCreation.status = "";
      state.noteCreation.error = "";
      state.noteCreation.success = "";
    },
    clearNoteEdition: (state) => {
      state.noteEdition.status = "";
      state.noteEdition.error = "";
      state.noteEdition.success = "";
    },
  },
  extraReducers: {
    [fetchNotes.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchNotes.fulfilled]: (state, action) => {
      if (action.payload.error) {
        state.status = "failed";
        state.error = action.payload.error;
      } else {
        state.status = "ready";
        state.notes = state.notes.concat(action.payload);
      }
    },
    [fetchNotes.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [createNote.pending]: (state, action) => {
      state.noteCreation.status = "loading";
    },
    [createNote.rejected]: (state, action) => {
      state.noteCreation.status = "failed";
      state.noteCreation.error = action.error.message;
    },
    [createNote.fulfilled]: (state, action) => {
      let ap = action.payload;
      if (ap.error) {
        state.noteCreation.error = ap.error;
        state.noteCreation.status = "failed";
      } else {
        state.noteCreation.status = "success";
        state.notes.push(ap.note);
        setLocal("notes", JSON.stringify(state.notes));
      }
    },
    [editNote.pending]: (state, action) => {
      state.noteEdition.status = "loading";
    },
    [editNote.rejected]: (state, action) => {
      state.noteEdition.status = "failed";
      state.noteEdition.error = action.error.message;
    },
    [editNote.fulfilled]: (state, action) => {
      const pl = action.payload;
      if (pl.error) {
        state.noteEdition.status = "failed";
        state.noteEdition.error = pl.error;
      } else {
        state.noteEdition.status = "succeeded";
        state.noteEdition.success = "saved!";
      }
    },
  },
});

export const {
  noteUpdated,
  noteDeleted,
  clearNoteCreation,
  clearNoteEdition,
} = notesSlice.actions;

export const selectAllNotes = (state) => state.notes.notes;
export const findNoteById = (state, noteId) =>
  state.notes.notes.find((note) => note._id === noteId);
export const selectStatus = (state) => state.notes.status;
export const reqStatus = (state) => state.notes.noteCreation.status;
export const createNoteError = (state) => state.notes.noteCreation.error;
export const editNoteStatus = (state) => state.notes.noteEdition.status;
export const editNoteError = (state) => state.notes.noteEdition.error;
export const editNoteSuccess = (state) => state.notes.noteEdition.success;

export default notesSlice.reducer;
