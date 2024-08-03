import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Navbar, Container, Nav, Button, Alert, Modal, Form, Table, Image } from 'react-bootstrap';
import { Bell, List } from 'react-bootstrap-icons';
import '../Styles/MemberDashboard.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Link } from "react-router-dom";
import Select from "react-select";
import { Country, State } from "country-state-city";
import '../../App.css'
import emailjs from "emailjs-com";


// Upcoming Birthdays Component
const UpcomingBirthdays = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [filteredBirthdays, setFilteredBirthdays] = useState([]);


  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    filterBirthdays(selectedMonth);
  };

  return (
    <div className="upcoming-birthdays-container">
      <h2 className="text-center mt-3">Upcoming Birthdays</h2>
      <Form onSubmit={handleSubmit} className="mb-3">
        <Form.Group className="mb-3">
          <Form.Label>Select Month</Form.Label>
          <DatePicker
            selected={selectedMonth}
            onChange={handleMonthChange}
            dateFormat="MMMM"
            showMonthYearPicker
            showFullMonthYearPicker
            showFourColumnMonthYearPicker
            className="form-control"
          />
        </Form.Group>
        <Button type="submit" variant="primary" className='d-block mx-auto mt-3 w-50'>Filter Birthdays</Button>
      </Form>
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Birthday</th>
            <th>Phone</th>
            <th>Church</th>
          </tr>
        </thead>
        <tbody>
          {filteredBirthdays.map((birthday, index) => (
            <tr key={birthday.id}>
              <td>{index + 1}</td>
              <td>{birthday.firstName} {birthday.lastName}</td>
              <td>{birthday.dateOfBirth.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</td>
              <td>{birthday.phone}</td>
              <td>{birthday.church}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {filteredBirthdays.length === 0 && <p className="text-center">No upcoming birthdays found for the selected month.</p>}
    </div>
  );
};


/*
    devotional Component

*/


const Devotional = () => {
  const pdfUrl = {LOLDJuly2024};

  return (
    <div className="devotional-container" style={{ padding: '1rem', maxWidth: '100%', boxSizing: 'border-box' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Light of Life Devotional</h2>
      <PDFViewer pdfUrl={LOLDJuly2024} />
    </div>
  );
};




// Profile Component
const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editDetails, setEditDetails] = useState({
    phone: '',
    city: '',
    state: '',
    country: '',
    church: '',
    zone: '',
    cell: '',
    occupation: ''
  });

  useEffect(() => {
    if (currentUser) {
      const fetchUserDetails = async () => {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          setEditDetails({
            phone: docSnap.data().phone,
            city: docSnap.data().address.city,
            state: docSnap.data().address.state,
            country: docSnap.data().address.country,
            church: docSnap.data().church,
            zone: docSnap.data().zone,
            cell: docSnap.data().cell,
            occupation: docSnap.data().occupation
          });
        } else {
          console.log("No such document!");
        }
      };

      fetchUserDetails();
    }
  }, [currentUser]);

  const handleEditChange = (e) => {
    setEditDetails({ ...editDetails, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        phone: editDetails.phone,
        address: {
          city: editDetails.city,
          state: editDetails.state,
          country: editDetails.country
        },
        church: editDetails.church,
        zone: editDetails.zone,
        cell: editDetails.cell,
        occupation: editDetails.occupation
      });
      setUserDetails(prevDetails => ({
        ...prevDetails,
        phone: editDetails.phone,
        address: {
          city: editDetails.city,
          state: editDetails.state,
          country: editDetails.country
        },
        church: editDetails.church,
        zone: editDetails.zone,
        cell: editDetails.cell,
        occupation: editDetails.occupation
      }));
      setEditMode(false);
      toggleProfile();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

    return (
      <div className="profile-container">
      <div className="profile-picture-container">
        {userDetails?.profilePictureUrl && (
          <img
            src={userDetails.profilePictureUrl}
            alt="Profile"
            className="profile-picture"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '20px'
            }} 
          />
        )}
      </div>
        <h3 style={{textAlign: 'center', color: 'blue', fontWeight: 'bold'}}>Profile Details</h3>
        {editMode ? (
          <div>
            <div className="form-group">
              <label>Phone:</label>
              <input type="text" name="phone" value={editDetails.phone} onChange={handleEditChange} className="form-control"/>
            </div>
            <div className="form-group">
              <label>City:</label>
              <input type="text" name="city" value={editDetails.city} onChange={handleEditChange} className="form-control"/>
            </div>
            <div className="form-group">
              <label>State:</label>
              <input type="text" name="state" value={editDetails.state} onChange={handleEditChange} className="form-control"/>
            </div>
            <div className="form-group">
              <label>Country:</label>
              <input type="text" name="country" value={editDetails.country} onChange={handleEditChange} className="form-control"/>
            </div>
            <div className="form-group">
              <label>Church:</label>
              <input type="text" name="church" value={editDetails.church} onChange={handleEditChange} className="form-control"/>
            </div>
            <div className="form-group">
              <label>Zone:</label>
              <input type="text" name="zone" value={editDetails.zone} onChange={handleEditChange} className="form-control"/>
            </div>
            <div className="form-group">
              <label>Cell:</label>
              <input type="text" name="cell" value={editDetails.cell} onChange={handleEditChange} className="form-control"/>
            </div>
            <div className="form-group">
              <label>Occupation:</label>
              <input type="text" name="occupation" value={editDetails.occupation} onChange={handleEditChange} className="form-control"/>
            </div>
            <button onClick={handleSave} className="btn btn-success">Save</button>
          </div>
        ) : (
          <div>
          <p><strong>First Name:</strong> </p>
          <p><strong>Last Name:</strong> </p>
          <p><strong>Email:</strong> </p>
          <p><strong>Phone:</strong></p>
          <p><strong>Date of Birth:</strong> </p>
          <p><strong>City:</strong> </p>
          <p><strong>State:</strong> </p>
          <p><strong>Country:</strong> </p>
          <p><strong>Church:</strong> </p>
          <p><strong>Zone:</strong> </p>
          <p><strong>Cell:</strong> </p>
          <p><strong>Occupation:</strong> </p>
          <button className="btn btn-primary d-block mx-auto mt-4 w-50">Edit</button>
        </div>
        )}
      </div>
    );
  }








// Support Component
const Support = () => {
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      email: '',
      church: '',
      message: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
  
    const handleChange = (e) => {
      setFormErrors({});
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const validateForm = () => {
      let errors = {};
      if (!formData.name.trim()) errors.name = 'Name is required';
      if (!formData.email.trim()) errors.email = 'Email is required';
      if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
      if (!formData.church.trim()) errors.church = 'Name of Church is required';
      if (!formData.message.trim()) errors.message = 'Message is required';
      if (!formData.phone.trim()) {
        errors.phone = 'Phone number is required';
      } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
        errors.phone = 'Phone number is invalid';
      }
      return errors;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const errors = validateForm();
      if (Object.keys(errors).length === 0) {
        setIsSubmitting(true);
        try {
          const response = await emailjs.send(
            'service_9y9qd0r',
            'template_cywtduf',
            {
              to_email: 'chukwudipeculiar@gmail.com',
              from_name: formData.name,
              from_phone: formData.phone,
              from_email: formData.email,
              church: formData.church,
              message: formData.message,
            },
            'G0uRp4jJwwELDgewX'
          );
  
          if (response.status === 200) {
            alert('Message sent successfully!');
            setFormData({
              name: '',
              phone: '',
              email: '',
              church: '',
              message: '',
            });
            setIsSuccess(true);
          } else {
            alert('Failed to send message. Please try again.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        } finally {
          setIsSubmitting(false);
        }
      } else {
        setFormErrors(errors);
      }
    };
  
    return (
      <section className="contact-section section-padding" id="section_6">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12 mx-auto">
              <h4 className="text-center mb-4">Have any question? <br/> Send us a message</h4>
  
              <form
                className="custom-form contact-form mb-5 mb-lg-0"
                action="#"
                method="post"
                role="form"
                onSubmit={handleSubmit}
              >
                <div className="contact-form-body">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        id="name"
                        className="form-control"
                        placeholder="Full name"
                        required
                      />
                      {formErrors.name && (
                        <p style={{ color: 'red' }}>{formErrors.name}</p>
                      )}
                    </div>
  
                    <div className="col-lg-6 col-md-6 col-12">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        id="phone"
                        className="form-control"
                        placeholder="Phone number"
                        required
                      />
                      {formErrors.phone && (
                        <p style={{ color: 'red' }}>{formErrors.phone}</p>
                      )}
                    </div>
  
                    <div className="col-lg-6 col-md-6 col-12">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        pattern="[^ @]*@[^ @]*"
                        className="form-control"
                        placeholder="Email address"
                        required
                      />
                      {formErrors.email && (
                        <p style={{ color: 'red' }}>{formErrors.email}</p>
                      )}
                    </div>
  
                    <div className="col-lg-6 col-md-6 col-12 mb-4">
                      <input
                        type="text"
                        name="church"
                        id="church"
                        value={formData.church}
                        onChange={handleChange}
                        placeholder="Church"
                        required
                      />
                      {formErrors.church && (
                        <p style={{ color: 'red' }}>{formErrors.church}</p>
                      )}
                    </div>
  
                    <div className="col-12">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="3"
                        className="form-control"
                        id="message"
                        placeholder="Message"
                        required
                      ></textarea>
                      {formErrors.message && (
                        <p style={{ color: 'red' }}>{formErrors.message}</p>
                      )}
                    </div>
  
                    <div className="col-lg-4 col-md-10 col-8 mx-auto">
                      <button type="submit" className="form-control" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send message'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  };

  






// Main Dashboard Component
const Dashboard = () => {
  const navigate = useNavigate();
  // const [userDetails, setUserDetails] = useState(null);
  const [activeComponent, setActiveComponent] = useState('attendance');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      alert('Failed to log out: ' + error.message);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className="dashboard">
      <Navbar bg="light" expand="lg" className="dashboard-navbar">
        <Container fluid>
          <Navbar.Brand className="dashboard-title">Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" style={{fontWeight: 'bold'}}>
              <Nav.Link onClick={() => setActiveComponent('attendance')}>Attendance</Nav.Link>
              <Nav.Link onClick={() => setActiveComponent('devotional')}>Light of Life Devotional</Nav.Link>
              <Nav.Link onClick={() => setActiveComponent('giving')}>Givings</Nav.Link>
              <Nav.Link onClick={() => setActiveComponent('messages')}>Messages</Nav.Link>
              <Nav.Link onClick={() => setActiveComponent('profile')}>Profile</Nav.Link>
              <Nav.Link onClick={() => setActiveComponent('support')}>Support</Nav.Link>
              <Nav.Link onClick={() => setShowLogoutModal(true)}>Logout</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={toggleNotifications} className="notification-icon" style={{fontWeight: 'bold'}}>
                 <Bell />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="main-content">
        {activeComponent === 'attendance' && <Attendance navigate={navigate} />}
        {activeComponent === 'devotional' && <Devotional />}
        {activeComponent === 'giving' && <Giving />}
        {activeComponent === 'messages' && <Media />}
        {activeComponent === 'profile' && <Profile />}
        {activeComponent === 'support' && <Support />}
      </main>

      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {showNotifications && (
        <div ref={dropdownRef} className="notifications-dropdown">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className="notification-item">
                {notification.message}
              </div>
            ))
          ) : (
            <div className="notification-item">No new notifications</div>
          )}
        </div>
      )}
    </div>
  );
};
export default Dashboard;