import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="app-navbar" />
      <Nav className="mr-auto">
        <Nav.Item>
          <Link className="nav-link" to="/">
            Todos
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="nav-link" to="/create-todo">
            Create Todo
          </Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}
