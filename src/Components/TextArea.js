import React from "react";

export function TextArea(props) {
  const { ph, size, req, max, min } = props;

  return (
    <textarea
      className={`form-control form-control-${size}`}
      {...props}
      placeholder={ph}
      required={req ? true : false}
      maxLength={max ? max : ""}
      minLength={min ? min : ""}
    ></textarea>
  );
}
