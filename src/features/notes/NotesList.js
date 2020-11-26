import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotes, selectAllNotes, selectStatus } from "./notesSlice";
import {
  selectTitleFilter,
  selectStatusFilter,
  selectSortMethod,
} from "../filter/filterSlice";
import { NoteCard } from "./NoteCard";
import { Loading } from "../../Components/Loading";
import { NotFound } from "../../Components/NotFound";
import { TopCollapse } from "../../Components/TopCollapse";
import { Container } from "react-bootstrap";

function ErrorMessage() {
  return (
    <NotFound className="mt-5">
      <h1 className="pb-3">oops! something went wrong.</h1>
      <p>
        please try{" "}
        <a href="/" style={{ textDecoration: "underline" }}>
          refreshing
        </a>{" "}
        the page page after sometime.
      </p>
    </NotFound>
  );
}

export default function NotesList() {
  const dispatch = useDispatch();
  const allNotes = useSelector(selectAllNotes);
  const status = useSelector(selectStatus);

  const titleFilter = useSelector(selectTitleFilter);
  const statusFilter = useSelector(selectStatusFilter);
  const sortMethod = useSelector(selectSortMethod);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNotes());
    }
  }, [dispatch, allNotes]);

  let content;

  if (status === "loading") {
    content = <Loading />;
  } else if (status === "ready") {
    let orderedNotes;
    if (sortMethod === "asc") {
      orderedNotes = allNotes
        .slice()
        .sort((a, b) => b.created.localeCompare(a.created));
    } else if (sortMethod === "desc") {
      orderedNotes = allNotes
        .slice()
        .sort((a, b) => b.created.localeCompare(a.created))
        .reverse();
    }

    let filteredNotes = orderedNotes
      .filter(
        (note) =>
          note.title.toUpperCase().indexOf(titleFilter.toUpperCase()) > -1
      )
      .filter(
        (note) =>
          note.status.toUpperCase().indexOf(statusFilter.toUpperCase()) > -1
      );

    content = filteredNotes.map((note) => (
      <NoteCard note={note} key={note._id} />
    ));
  } else if (status === "failed") {
    content = "";
  }

  return (
    <>
      <Container fluid className="p-0">
        <TopCollapse />
        {status === "failed" && <ErrorMessage />}
        <div className="cardContainer pt-5 px-3 pb-4">{content}</div>
      </Container>
    </>
  );
}
