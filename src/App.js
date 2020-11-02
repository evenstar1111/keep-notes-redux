import React, { lazy, Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

import { Container } from "react-bootstrap";
import { NavBar } from "./Components/NavBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Loading } from "./Components/Loading";

const TodosList = lazy(() => import("./features/todos/TodosList"));
const CreateTodo = lazy(() => import("./features/todos/CreateTodo"));
const SingleTodoPage = lazy(() => import("./features/todos/SingleTodoPage"));
const EditTodo = lazy(() => import("./features/todos/EditTodo"));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<Loading />}>
          <Container className="p-0" fluid>
            <NavBar />
            <Switch>
              <Route path="/" exact component={TodosList} />
              <Route path="/create-todo" component={CreateTodo} />
              <Route path="/todos/:todoId" component={SingleTodoPage} />
              <Route path="/editTodo/:todoId" component={EditTodo} />
              <Redirect to="/" />
            </Switch>
          </Container>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
