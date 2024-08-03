import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import '../../App.css'

function CustomNavbar() {
  


  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
      <Navbar.Brand className="d-flex align-items-center ms-auto nav-title">
          <Link to="/"  style={{ textDecoration: 'none' }}> 
          <h2 className="nav-title2" 
          style={{ color: 'white', textDecoration: 'none' }}
          > TLBC
          </h2> </Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
