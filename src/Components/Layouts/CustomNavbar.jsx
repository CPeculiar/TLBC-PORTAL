import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import '../Styles/CustomNavbar.css';
import { useFormContext } from "../Contexts/FormContext"; 
import { useNavigate } from 'react-router-dom';

function CustomNavbar() {
  const navigate = useNavigate();
  const { handleLoginClick, handleRegisterClick, handleSupportClick, handleBackToHome  } = useFormContext();

  const handleHomeClick = () => {
    handleBackToHome(); // Clear previous selections
    navigate('/'); // Redirect to home page
  };


  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container className="d-flex justify-content-between align-items-center custom-container">
        <Navbar.Brand className="d-flex align-items-center"> TLBC PORTAL
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-links">
            <Nav.Link onClick={handleHomeClick}>Home</Nav.Link>
            <Nav.Link onClick={handleRegisterClick}>Register</Nav.Link>
            <Nav.Link onClick={handleLoginClick}>Login</Nav.Link>
            <Nav.Link onClick={handleSupportClick}>Support</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
