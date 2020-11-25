import React, { useState, useEffect } from "react";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";
import { useDispatch, useSelector } from "react-redux";
import {
  createNote,
  clearNoteCreation,
  reqStatus,
  createNoteError,
} from "./notesSlice";
import Button from "../../Components/OutlinedButton";
import { Form, FormGroup, FormLabel, Container } from "react-bootstrap";
import { TextInput } from "../../Components/TextInput";
import { TextArea } from "../../Components/TextArea";
import { FormText } from "../../Components/FormText";

export default function CreateNote() {
  const dispatch = useDispatch();
  const status = useSelector(reqStatus);
  const message = useSelector(createNoteError);
  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    dispatch(clearNoteCreation());
  }, [dispatch]);

  const { title, description } = values;

  const canSave = title && description && true;

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      await dispatch(createNote({ title, description }));
      setValues({ title: "", description: "" });
    }
  };

  const onInputChange = (e, name) =>
    setValues({ ...values, [name]: e.target.value });

  const formText =
    status === "loading"
      ? "processing request, please wait"
      : status === "failed"
      ? message
      : status === "success"
      ? "note created successfuly"
      : "";

  const hex =
    status === "loading"
      ? "#727272"
      : status === "failed"
      ? "#e73f15"
      : status === "success" && "#129e00";

  const createForm = (
    <Form onSubmit={onFormSubmit}>
      <FormGroup>
        <FormLabel htmlFor="note-title" srOnly>
          Note Title
        </FormLabel>
        <TextInput
          value={title}
          onChange={(e) => onInputChange(e, "title")}
          id="note-title"
          ph="note title"
          size="lg"
          req={"true"}
          max="20"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="note-description" srOnly>
          Note Description
        </FormLabel>
        <TextArea
          value={description}
          onChange={(e) => onInputChange(e, "description")}
          size="lg"
          id="note-description"
          ph="note description"
          req={"true"}
          min="5"
        />
        <FormText id="create-note-message" hex={hex} children={formText} />
      </FormGroup>
      <Button size="lg" context="primary" type="submit" disabled={!canSave}>
        Create Note
      </Button>
    </Form>
  );

  return (
    <ErrorBoundary>
      <Container className="formContainer">
        <h1>Create Note</h1>
        {createForm}
      </Container>
    </ErrorBoundary>
  );
}
