import React, { useState, useEffect } from "react";
import Button from "../../Components/OutlinedButton";
import {
  createTodo,
  clearTodoCreation,
  reqStatus,
  createTodoError,
} from "./todosSlice";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, FormLabel, Container } from "react-bootstrap";
import { TextInput } from "../../Components/TextInput";
import { TextArea } from "../../Components/TextArea";
import { FormText } from "../../Components/FormText";

export default function CreateTodo() {
  const dispatch = useDispatch();
  const status = useSelector(reqStatus);
  const message = useSelector(createTodoError);
  const [values, setValues] = useState({
    title: "",
    description: "",
    label: "",
  });

  useEffect(() => {
    dispatch(clearTodoCreation());
  }, []);

  const { title, description, label } = values;

  const canSave = title && description && label && true;

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      await dispatch(createTodo({ title, description, label }));
      setValues({ title: "", description: "", label: "" });
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
      ? "todo created successfuly"
      : "";

  const hex =
    status === "loading"
      ? "#a5a5a5"
      : status === "failed"
      ? "#e73f15"
      : status === "success" && "#29da00";

  const createForm = (
    <Form onSubmit={onFormSubmit}>
      <FormGroup>
        <FormLabel htmlFor="todo-title" srOnly>
          Todo Title
        </FormLabel>
        <TextInput
          value={title}
          onChange={(e) => onInputChange(e, "title")}
          id="todo-title"
          ph="todo title"
          size="lg"
          req={"true"}
          max="20"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="todo-description" srOnly>
          Todo Description
        </FormLabel>
        <TextArea
          value={description}
          onChange={(e) => onInputChange(e, "description")}
          size="lg"
          id="todo-description"
          ph="todo description"
          req={"true"}
          min="5"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="todo-label" srOnly>
          Todo Label
        </FormLabel>
        <TextInput
          value={label}
          onChange={(e) => onInputChange(e, "label")}
          id="todo-label"
          ph="todo label"
          size="lg"
          req={"true"}
          max="10"
        />
        <FormText id="create-todo-message" hex={hex} children={formText} />
      </FormGroup>
      <Button size="lg" context="primary" type="submit" disabled={!canSave}>
        Create Todo
      </Button>
    </Form>
  );

  return (
    <>
      <Container className="formContainer">
        <h1>Create Todo</h1>
        {createForm}
      </Container>
    </>
  );
}
