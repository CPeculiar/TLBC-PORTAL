import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Facebook, Twitter, Linkedin, Youtube, Book } from 'lucide-react';

const Test = () => {
  return (
    <div className="church-homepage">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <span className="text-warning me-2">†</span> Deeds<sup>2</sup>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#sermons">Sermons</Nav.Link>
              <Nav.Link href="#events">Events</Nav.Link>
              <Nav.Link href="#pages">Pages</Nav.Link>
              <Nav.Link href="#stories">Stories</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
            </Nav>
            <Button variant="warning">LIVE PRAYER</Button>
            <Nav className="ms-2">
              <Nav.Link href="#facebook"><Facebook size={16} /></Nav.Link>
              <Nav.Link href="#twitter"><Twitter size={16} /></Nav.Link>
              <Nav.Link href="#linkedin"><Linkedin size={16} /></Nav.Link>
              {/* <Nav.Link href="#pinterest"><Pinterest size={16} /></Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="hero-section position-relative text-white text-center d-flex align-items-center justify-content-center" style={{
        backgroundImage: 'url("https://via.placeholder.com/1920x1080")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh'
      }}>
        <div className="hero-content">
          <div className="mb-4">
            <Book size={48} className="text-warning" />
          </div>
          <h1 className="display-4 fw-bold mb-3">Salvation Is Here Join<br />Our Community</h1>
          <p className="lead mb-4">This is a place of hope, meaning, and purpose. Visit become a part<br />bigger a movement that is changing lives.</p>
          <Button variant="warning" size="lg">JOIN CHURCH</Button>
        </div>
      </div>

      <Container className="mt-n5 position-relative">
        <div className="bg-white p-4 shadow-sm rounded">
          <div className="row align-items-center">
            <div className="col-md-4">
              <img src="https://via.placeholder.com/400x300" alt="Church service" className="img-fluid rounded" />
            </div>
            <div className="col-md-8">
              <span className="badge bg-danger mb-2">LIVE</span>
              <h2 className="mb-3">Preaching. Worship.<br />An Online Family.</h2>
              <div className="d-flex">
                <Button variant="outline-secondary" className="me-2"><Youtube size={20} /></Button>
                <Button variant="outline-secondary" className="me-2"><Facebook size={20} /></Button>
                <Button variant="outline-secondary" className="me-2"><Book size={20} /></Button>
                <Button variant="outline-secondary"><Linkedin size={20} /></Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Test;