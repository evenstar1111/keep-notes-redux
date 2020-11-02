import React from "react";

export function TextInput(props) {
  const { ph, size, req, max, min } = props;

  return (
    <input
      className={`form-control form-control-${size}`}
      {...props}
      placeholder={ph}
      required={req ? true : false}
      maxLength={max ? max : ""}
      minLength={min ? min : ""}
    />
  );
}
