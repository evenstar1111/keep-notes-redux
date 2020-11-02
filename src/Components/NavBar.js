import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Link className="navbar-brand" to="/">
        React Todo App
      </Link>
      <Navbar.Toggle aria-controls="app-navbar" />
      <Navbar.Collapse id="app-navbar">
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
      </Navbar.Collapse>
    </Navbar>
  );
}
