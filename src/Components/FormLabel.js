import React from "react";

export function FormLabel(props) {
  const { htmlFor, srOnly, children } = props;

  return (
    <label htmlFor={htmlFor} className={srOnly ? "sr-only" : ""}>
      {children}
    </label>
  );
}
