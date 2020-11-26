import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  findNoteById,
  editNote,
  editNoteError,
  editNoteStatus,
  editNoteSuccess,
  clearNoteEdition,
} from "./notesSlice";
import { PrevPage } from "../../Components/PrevPage";
import { NotFound } from "./NotFound";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";
import Button from "../../Components/OutlinedButton";
import { TextInput } from "../../Components/TextInput";
import { TextArea } from "../../Components/TextArea";
import { FormText } from "../../Components/FormText";
import { Form, FormGroup, FormLabel, Container } from "react-bootstrap";

export default function EditNote({ match }) {
  const dispatch = useDispatch();
  const { noteId } = match.params;
  const note = useSelector((state) => findNoteById(state, noteId));
  const actionStatus = useSelector(editNoteStatus);
  const error = useSelector(editNoteError);
  const success = useSelector(editNoteSuccess);

  const [inputs, setInputs] = useState({
    title: note && note.title,
    description: note && note.description,
    status: note && note.status,
  });

  const { title, description, status } = inputs;

  const canSubmit = [title, description, status].every(Boolean);

  useEffect(() => {
    dispatch(clearNoteEdition());
  }, [dispatch]);

  const onInputChange = (e, name) =>
    setInputs({ ...inputs, [name]: e.target.value });

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (canSubmit) {
      const body = {
        _id: noteId,
        title,
        description,
        status,
      };
      await dispatch(editNote(body));
    }
  };

  const actionMessage =
    actionStatus === "loading"
      ? "saving..."
      : actionStatus === "failed"
      ? error
      : actionStatus === "succeeded"
      ? success
      : "";

  const loading = actionStatus === "loading" ? true : false;

  const hex =
    actionStatus === "loading"
      ? "#a5a5a5"
      : actionStatus === "failed"
      ? "#e73f15"
      : actionStatus === "succeeded" && "#29da00";

  const editForm = (
    <Form onSubmit={onFormSubmit}>
      <FormGroup>
        <FormLabel htmlFor="edit-note-title">Title</FormLabel>
        <TextInput
          id="edit-note-title"
          size="lg"
          value={title}
          onChange={(e) => onInputChange(e, "title")}
          ph="edit note title"
          req="true"
          max="20"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="edit-note-description">Description</FormLabel>
        <TextArea
          id="edit-note-description"
          size="lg"
          value={description}
          onChange={(e) => onInputChange(e, "description")}
          ph="note description"
          req="true"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="edit-note-status">Status</FormLabel>
        <select
          id="edit-note-status"
          className="custom-select custom-select-lg"
          value={status}
          onChange={(e) => onInputChange(e, "status")}
        >
          <option value="new">new</option>
          <option value="opened">opened</option>
          <option value="working on">working on</option>
          <option value="done">done</option>
        </select>
        <FormText hex={hex} children={actionMessage} />
      </FormGroup>
      <Button type="submit" context="primary" disabled={!canSubmit}>
        SAVE CHANGES
      </Button>
    </Form>
  );

  return (
    <ErrorBoundary>
      <Container className="formContainer">
        {note ? (
          <>
            {/* <div className="prevPage">
              <button
                title="go back to previous page"
                onClick={() => history.goBack()}
              >
                <span>&larr;</span>
              </button>
            </div> */}
            <PrevPage />
            <h1>Edit Note</h1>
            {editForm}
          </>
        ) : (
          <NotFound />
        )}
      </Container>
    </ErrorBoundary>
  );
}
