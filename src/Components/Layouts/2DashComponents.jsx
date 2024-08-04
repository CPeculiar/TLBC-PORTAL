import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTachometerAlt, faCalendarAlt, faUserShield, faChartBar, faMoneyBillWave, faUsers } from '@fortawesome/free-solid-svg-icons';

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`bg-purple sidebar ${isOpen ? 'open' : ''}`} id="sidebar-wrapper">
      <div className="sidebar-heading">
        <img src="/path-to-your-logo.png" alt="Sophia ERP Church" className="logo" />
        Sophia ERP Church
        <button className="close-btn d-lg-none" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="list-group list-group-flush">
        <Link to="/" className="list-group-item list-group-item-action">
          <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
        </Link>
        <Link to="/attendance" className="list-group-item list-group-item-action">
          <FontAwesomeIcon icon={faCalendarAlt} /> Attendance
        </Link>
        <Link to="/administrator" className="list-group-item list-group-item-action">
          <FontAwesomeIcon icon={faUserShield} /> Administrator
        </Link>
        <Link to="/reports" className="list-group-item list-group-item-action">
          <FontAwesomeIcon icon={faChartBar} /> Reports
        </Link>
        <Link to="/finance" className="list-group-item list-group-item-action">
          <FontAwesomeIcon icon={faMoneyBillWave} /> Finance
        </Link>
        <Link to="/people" className="list-group-item list-group-item-action">
          <FontAwesomeIcon icon={faUsers} /> People
        </Link>
      </div>
      <div className="mt-auto">
        <Link to="/logout" className="list-group-item list-group-item-action">
          Log out
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;