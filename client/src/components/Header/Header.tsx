import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { NavLink, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../store/slices/modalSlice';
import { logoutUser, selectAuth } from '../../store/slices/authSlice';
import { AppDispatch } from '../../store/store';
import './Header.css';

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(selectAuth);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access'));
  const [redirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('access'));
    setRedirectToHome(false);
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsLoggedIn(false);
    setRedirectToHome(true);
  };

  return (
    <>
      {redirectToHome && <Navigate to='/' />}
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <Navbar.Brand as={NavLink} to='/'>
            Navbar
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link as={NavLink} to='/'>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to='/about'>
                About
              </Nav.Link>
              <Nav.Link as={NavLink} to='/contacts'>
                Contacts
              </Nav.Link>
            </Nav>
            <div className='header-auth-buttons'>
              {isLoggedIn ? (
                <div className='header-auth-buttons'>
                  <NavLink to='/dashboard' className='nav-link'>
                    <Button variant='outline-light'>Dashboard</Button>
                  </NavLink>
                  <Button variant='outline-light' onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className='header-auth-buttons'>
                  <Button variant='outline-light' onClick={() => dispatch(openModal('register'))}>
                    Sign Up
                  </Button>
                  <Button variant='outline-success' onClick={() => dispatch(openModal('login'))}>
                    Log In
                  </Button>
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
