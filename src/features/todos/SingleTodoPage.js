import React from "react";
import Button from "../../Components/OutlinedButton";
import { findTodoById } from "./todosSlice";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { TimeAgo } from "./TimeAgo";
import { DeleteTodo } from "./DeleteTodo";
import { TodoStatus } from "./TodoStatus";
import { NotFound } from "./NotFound";

export default function SingleTodoPage({ match }) {
  const { todoId } = match.params;

  const history = useHistory();

  console.log(todoId);

  const todo = useSelector((state) => findTodoById(state, todoId));

  let content;

  if (todo) {
    content = (
      <>
        <div className="prevPage" title="go to previous page">
          <button type="button" onClick={() => history.goBack()}></button>
        </div>
        <h1>{todo.title}</h1>
        <p className="spTodoStatus">
          <TodoStatus status={todo.status} />
        </p>
        <p className="spTimeAgo">
          <TimeAgo timeStamp={todo.created} />
        </p>
        <p className="spTodoDesc">{todo.description}</p>
        <Button
          className="mr-2"
          context="info"
          onClick={() => history.push(`/editTodo/${todo._id}`)}
        >
          EDIT
        </Button>
        <DeleteTodo
          todoId={todoId}
          size="md"
          onClick={() => history.goBack()}
        />
      </>
    );
  } else {
    content = <NotFound />;
  }

  return (
    <>
      <Container className="singleTodoPage">{content}</Container>
    </>
  );
}
