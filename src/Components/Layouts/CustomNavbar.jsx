import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import '../Styles/CustomNavbar.css'

function CustomNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container className="d-flex justify-content-between align-items-center custom-container">
        <Navbar.Brand className="d-flex align-items-center"> TLBC PORTAL
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;


/**
<Button
                  variant="warning"
                  size="lg"
                  className="w-50 custom-button me-2"
                  style={{
                    fontWeight: "bolder",
                    fontSize: "1.5em",
                    color: "black",
                  }}
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
                <Button
                  variant="warning"
                  size="lg"
                  className="w-50 custom-button"
                  style={{
                    fontWeight: "bolder",
                    fontSize: "1.5em",
                    color: "black",
                  }}
                  onClick={handleRegisterClick}
                >
                  Register
                </Button>
              </div>
              









// import React from 'react';
// import { Navbar, Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';


// import '../../App.css'

// function CustomNavbar() {
  


//   return (
//     <Navbar bg="dark" variant="dark" expand="lg">
//       <Container>
//       <Navbar.Brand className="d-flex align-items-center ms-auto nav-title">
//           <Link to="/"  style={{ textDecoration: 'none' }}> 
//           <h2 className="nav-title2" 
//           style={{ color: 'white', textDecoration: 'none' }}
//           > TLBC
//           </h2> </Link>
//         </Navbar.Brand>
//       </Container>
//     </Navbar>
//   );
// }

// export default CustomNavbar;

*/