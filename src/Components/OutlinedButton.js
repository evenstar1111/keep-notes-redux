import React from "react";
import { Button } from "react-bootstrap";

export default function OutlinedButton(props) {
  return (
    <>
      <Button {...props} variant={`outline-${props.context}`}>
        {props.children}
      </Button>
    </>
  );
}
