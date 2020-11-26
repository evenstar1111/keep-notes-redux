import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";

export function NotFound(props) {
  return (
    <Container>
      <Jumbotron className={`bg-light text-center ${props.className}`}>
        {props.children ? (
          props.children
        ) : (
          <>
            <h1 className="pb-3">Sorry! could not find the item</h1>
            <p>
              go back to <Link to="/">Notes</Link>
            </p>
          </>
        )}
      </Jumbotron>
    </Container>
  );
}
