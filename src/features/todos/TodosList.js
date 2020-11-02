import React, { useEffect } from "react";
import { fetchTodos, selectAllTodos, selectStatus } from "./todosSlice";
import {
  selectTitleFilter,
  selectStatusFilter,
  selectSortMethod,
} from "../filter/filterSlice";
import { useSelector, useDispatch } from "react-redux";
import { TodoCard } from "./TodoCard";

import { TopCollapse } from "../../Components/TopCollapse";
import { Container, CardColumns } from "react-bootstrap";
import { Loading } from "../../Components/Loading";

export default function TodosList() {
  const dispatch = useDispatch();
  const allTodos = useSelector(selectAllTodos);
  const status = useSelector(selectStatus);

  const titleFilter = useSelector(selectTitleFilter);
  const statusFilter = useSelector(selectStatusFilter);
  const sortMethod = useSelector(selectSortMethod);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [dispatch, allTodos]);

  let content;

  if (status === "loading") {
    content = <Loading />;
  } else if (status === "ready") {
    let orderedTodos;
    if (sortMethod === "asc") {
      orderedTodos = allTodos
        .slice()
        .sort((a, b) => b.created.localeCompare(a.created));
    } else if (sortMethod === "desc") {
      orderedTodos = allTodos
        .slice()
        .sort((a, b) => b.created.localeCompare(a.created))
        .reverse();
    }

    let filteredTodos = orderedTodos
      .filter(
        (todo) =>
          todo.title.toUpperCase().indexOf(titleFilter.toUpperCase()) > -1
      )
      .filter(
        (todo) =>
          todo.status.toUpperCase().indexOf(statusFilter.toUpperCase()) > -1
      );

    content = filteredTodos.map((todo) => (
      <TodoCard todo={todo} key={todo._id} />
    ));
  } else if (status === "failed") {
    content = (
      <div>
        <span>Sorry, could not load todos</span>
      </div>
    );
  }

  return (
    <>
      <Container fluid className="p-0">
        <TopCollapse />
        <CardColumns className="pt-5 px-3">{content}</CardColumns>
      </Container>
    </>
  );
}
