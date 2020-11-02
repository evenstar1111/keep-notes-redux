import React from "react";
import Button from "../../Components/OutlinedButton";
import { useHistory } from "react-router-dom";
import { DeleteTodo } from "./DeleteTodo";
import { TimeAgo } from "./TimeAgo";
import { TodoStatus } from "./TodoStatus";
import { Card } from "react-bootstrap";

export function TodoCard({ todo }) {
  const history = useHistory();

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <h5 className="mb-0">{todo.title}</h5>
        </Card.Title>
        <Card.Text>
          <TodoStatus status={todo.status} />
        </Card.Text>
        <Card.Text>
          <TodoDesc desc={todo.description} />
        </Card.Text>
        <TimeAgo timeStamp={todo.created} />
        <section className="btnContainer">
          <Button
            size="sm"
            context="info"
            onClick={() => history.push(`/todos/${todo._id}`)}
          >
            VIEW
          </Button>
          <DeleteTodo todoId={todo._id} />
        </section>
      </Card.Body>
    </Card>
  );
}

function TodoDesc({ desc }) {
  const len = desc.length;

  const textContent =
    len <= 145 ? <span>{desc}</span> : <span>{desc.substr(0, 145)}...</span>;

  return <>{textContent}</>;
}
