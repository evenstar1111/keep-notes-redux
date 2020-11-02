import React from "react";

export function FormText(props) {
  const { id, cls, hex, children } = props;

  return (
    <small
      id={id ? id : ""}
      className={`form-text ${cls}`}
      style={{ color: `${hex}` }}
    >
      {children}
    </small>
  );
}
