import React, { useEffect, useState } from "react";
import Button from "../../Components/OutlinedButton";
import { TextInput } from "../../Components/TextInput";
import { TextArea } from "../../Components/TextArea";
import { FormText } from "../../Components/FormText";
import { Form, FormGroup, FormLabel, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  findTodoById,
  editTodo,
  editTodoError,
  editTodoStatus,
  editTodoSuccess,
  clearTodoEdition,
} from "./todosSlice";
import { useHistory } from "react-router-dom";
import { NotFound } from "./NotFound";

export default function EditTodo({ match }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { todoId } = match.params;
  const todo = useSelector((state) => findTodoById(state, todoId));
  const actionStatus = useSelector(editTodoStatus);
  const error = useSelector(editTodoError);
  const success = useSelector(editTodoSuccess);

  const [inputs, setInputs] = useState({
    title: todo && todo.title,
    description: todo && todo.description,
    label: todo && todo.label,
    status: todo && todo.status,
  });

  const { title, description, label, status } = inputs;

  const canSubmit = [title, description, label, status].every(Boolean);

  useEffect(() => {
    dispatch(clearTodoEdition());
  }, []);

  const onInputChange = (e, name) =>
    setInputs({ ...inputs, [name]: e.target.value });

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (canSubmit) {
      const body = {
        _id: todoId,
        title,
        description,
        label,
        status,
      };
      await dispatch(editTodo(body));
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
        <FormLabel htmlFor="edit-todo-title">Title</FormLabel>
        <TextInput
          id="edit-todo-title"
          size="lg"
          value={title}
          onChange={(e) => onInputChange(e, "title")}
          ph="edit todo title"
          req="true"
          max="20"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="edit-todo-description">Description</FormLabel>
        <TextArea
          id="edit-todo-description"
          size="lg"
          value={description}
          onChange={(e) => onInputChange(e, "description")}
          ph="todo description"
          req="true"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="edit-todo-label">Label</FormLabel>
        <TextInput
          id="edit-todo-label"
          size="lg"
          value={label}
          onChange={(e) => onInputChange(e, "label")}
          ph="edit todo label"
          req="true"
          max="10"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="edit-todo-status">Status</FormLabel>
        <select
          id="edit-todo-status"
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
    <Container className="formContainer">
      {todo ? (
        <>
          <div className="prevPage">
            <button onClick={() => history.goBack()}></button>
          </div>
          <h1>Edit Todo</h1>
          {editForm}
        </>
      ) : (
        <NotFound />
      )}
    </Container>
  );
}
