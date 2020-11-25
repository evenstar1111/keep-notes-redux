import React, { useEffect } from "react";
import { fetchNotes, selectAllNotes, selectStatus } from "./notesSlice";
import {
  selectTitleFilter,
  selectStatusFilter,
  selectSortMethod,
} from "../filter/filterSlice";
import { useSelector, useDispatch } from "react-redux";
import { NoteCard } from "./NoteCard";

import { TopCollapse } from "../../Components/TopCollapse";
import { Container, CardColumns } from "react-bootstrap";
import { Loading } from "../../Components/Loading";

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
    content = (
      <div>
        <span>Sorry, could not load notes</span>
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
