import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Members from './components/Members';
import Attendance from './components/Attendance';
import Administrator from './components/Administrator';
import Reports from './components/Reports';
import Finance from './components/Finance';
import People from './components/People';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="d-flex" id="wrapper">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div id="page-content-wrapper" className={sidebarOpen ? 'toggled' : ''}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom d-lg-none">
            <button className="btn btn-primary" onClick={toggleSidebar}>
              Toggle Menu
            </button>
          </nav>
          <div className="container-fluid">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/members" element={<Members />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/administrator" element={<Administrator />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/people" element={<People />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;