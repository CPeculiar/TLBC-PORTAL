import React from 'react';
import { Navbar, Container } from 'react-bootstrap';


import '../../App.css'

function CustomNavbar() {
  


  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
      <Navbar.Brand className="d-flex align-items-center ms-auto nav-title">
          <h2 className="nav-title2" style={{ color: 'white' }}>TLBC</h2>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
