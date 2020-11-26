import React from "react";
import Button from "../../Components/OutlinedButton";
import { useHistory } from "react-router-dom";
import { DeleteNote } from "./DeleteNote";
import { TimeAgo } from "./TimeAgo";
import { NoteStatus } from "./NoteStatus";
import { Card } from "react-bootstrap";

export function NoteCard({ note }) {
  const history = useHistory();

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <h5 className="mb-0">{note.title}</h5>
        </Card.Title>
        <Card.Text>
          <NoteStatus status={note.status} />
        </Card.Text>
        <Card.Text className="noteDesc">
          <NoteDesc desc={note.description} />
        </Card.Text>
        <TimeAgo timeStamp={note.created} />
        <section className="btnContainer">
          <Button
            size="sm"
            context="info"
            onClick={() => history.push(`/notes/${note._id}`)}
          >
            VIEW
          </Button>
          <DeleteNote noteId={note._id} />
        </section>
      </Card.Body>
    </Card>
  );
}

function NoteDesc({ desc }) {
  const len = desc.length;

  const textContent =
    len <= 145 ? <span>{desc}</span> : <span>{desc.substr(0, 145)}...</span>;

  return <>{textContent}</>;
}
