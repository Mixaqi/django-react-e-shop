import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/slices/modalSlice";
import { logoutUser, selectAuth } from "../../store/slices/authSlice";

const Header: React.FC = () => {
  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Navbar
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contacts">
              Contacts
            </Nav.Link>
          </Nav>
          <Nav className="authButtons">
            {user ? (
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  onClick={() => dispatch(openModal("register"))}
                >
                  Sign Up
                </Button>
                <Button
                  variant="outline-success"
                  onClick={() => dispatch(openModal("login"))}
                >
                  Login
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
