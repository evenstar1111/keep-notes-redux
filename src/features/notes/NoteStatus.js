import React from "react";
import { Badge } from "react-bootstrap";

export function NoteStatus({ status }) {
  const checkNew = /new|^new|new$/i.test(status);
  const checkOpened = /open|opened|^open|open$/i.test(status);
  const checkWorkingOn = /working|working on|pending|^working|working$/i.test(
    status
  );
  const checkDone = /done|finished|finised|finis|worked|^done|done$/i.test(
    status
  );

  const variant = checkNew
    ? "danger"
    : checkOpened
    ? "warning"
    : checkWorkingOn
    ? "secondary"
    : checkDone
    ? "success"
    : "light";

  return (
    <Badge className="noteStatus" variant={variant}>
      <span>{status}</span>
    </Badge>
  );
}
