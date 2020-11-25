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

const NotesList = lazy(() => import("./features/notes/NotesList"));
const CreateNote = lazy(() => import("./features/notes/CreateNote"));
const SingleNotePage = lazy(() => import("./features/notes/SingleNotePage"));
const EditNote = lazy(() => import("./features/notes/EditNote"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Container className="p-0" fluid>
          <NavBar />
          <Switch>
            <Route path="/" exact component={NotesList} />
            <Route path="/create-note" component={CreateNote} />
            <Route path="/notes/:noteId" component={SingleNotePage} />
            <Route path="/editNote/:noteId" component={EditNote} />
            <Redirect to="/" />
          </Switch>
        </Container>
      </Suspense>
    </Router>
  );
}

export default App;
