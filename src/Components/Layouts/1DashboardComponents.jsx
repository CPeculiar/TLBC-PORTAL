import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import { XLg } from 'react-bootstrap-icons';
import Dashboard from './components/Dashboard';
import Membership from './components/Membership';
import Financial from './components/Financial';
import Reporting from './components/Reporting';
import Calendar from './components/Calendar';
import Communications from './components/Communications';
import Utilities from './components/Utilities';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Membership':
        return <Membership />;
      case 'Financial':
        return <Financial />;
      case 'Reporting':
        return <Reporting />;
      case 'Calendar':
        return <Calendar />;
      case 'Communications':
        return <Communications />;
      case 'Utilities':
        return <Utilities />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* Sidebar */}
        <Col md={3} lg={2} className={`sidebar bg-dark text-white ${sidebarOpen ? 'd-block' : 'd-none d-md-block'}`}>
          <div className="sidebar-sticky pt-3">
            <h3 className="mb-4">My Church</h3>
            <div className="d-md-none text-end">
              <XLg size={24} onClick={() => setSidebarOpen(false)} style={{ cursor: 'pointer' }} />
            </div>
            <Nav className="flex-column">
              {['Dashboard', 'Membership', 'Financial', 'Reporting', 'Calendar', 'Communications', 'Utilities'].map((item) => (
                <Nav.Link
                  key={item}
                  className={activeComponent === item ? 'active' : ''}
                  onClick={() => {
                    setActiveComponent(item);
                    setSidebarOpen(false);
                  }}
                >
                  {item}
                </Nav.Link>
              ))}
            </Nav>
          </div>
        </Col>

        {/* Main content */}
        <Col md={9} lg={10} className="ms-sm-auto px-md-4">
          <Navbar className="d-md-none" bg="light" expand="lg">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setSidebarOpen(!sidebarOpen)} />
              <Navbar.Brand>My Church</Navbar.Brand>
            </Container>
          </Navbar>
          <main className="mt-4">
            {renderComponent()}
          </main>
        </Col>
      </Row>
    </Container>
  );
};

export default App;