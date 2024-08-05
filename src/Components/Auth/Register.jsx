import React, { useState } from "react";
import { Form, Button, Alert, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import authService from "../../Services/authService";
import '../Styles/Registration.css'


const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "", 
    username: "", 
    password: "",
    birth_date: "",
    gender: "", 
    phone_number: "",
    zone: "", 
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  

 const handleInputChange = (e) => {
  //setErrors({});
  const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    // Clear the error for this field when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const validateForm = (data) => {
    const newErrors = {};
    let isValid = true;

    if (!data.first_name) {
      newErrors.first_name = "Firstname is required";
      isValid = false;
    }

    if (!data.last_name) {
      newErrors.last_name = "Lastname is required";
      isValid = false;
    }

    if (!data.username) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!data.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (!data.birth_date) {
      newErrors.birth_date = "Birth Date is required";
      isValid = false;
    }

    if (!validatePhone(data.phone_number)) {
      newErrors.phone_number = "Invalid phone number";
      isValid = false;
    }

    if (!data.gender) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }

    if (!data.zone) {
      newErrors.zone = "Please select your zone";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData)) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://tlbc-platform-api.onrender.com/api/onboarding/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;

        try {
          errorData = JSON.parse(errorText);
        } catch {
          throw new Error("An unknown error occurred");
        }

        // Extract the first error message
        const firstErrorMessage = Object.values(errorData).flat()[0];
        throw new Error(firstErrorMessage);
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      // Set the default authorization header for all future requests
      authService.setAuthHeader(data.access);

      // Get user info
      const userInfo = await authService.getUserInfo();
      
      // Navigate based on user role
      if (userInfo.role === 'admin' || userInfo.role === 'superadmin') {
        navigate('/admin');
      } else {
        navigate('/member');
      }

    } catch (error) {
      console.error("Error details:", error);
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const validatePhone = (phone) => {
    const re = /^\d{11}$/;
    return re.test(String(phone));
  };

  return (
    <>
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 py-5 mt-3">
      <div className="register-card " style={{  overflowY: 'auto', maxHeight: '90vh' }}>
          <Form id="registration-form" method="post" onSubmit={handleSubmit}>
            <h4
              className="card-title text-center mb-4"
              style={{ color: "black", marginBottom: '0px' }}
            >
              Registration Form
            </h4>
            <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="first_name">First Name</Form.Label>
              <Form.Control
                type="text"
                id="first_name"
                name="first_name"
                placeholder="Enter your First Name"
                onChange={handleInputChange}
                value={formData.first_name}
                isInvalid={!!errors.first_name}
          />
          <Form.Control.Feedback type="invalid">{errors.first_name}</Form.Control.Feedback>
        </Form.Group>
        </Col>
        <Col xs={12} md={6}>
            <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            placeholder="Enter your Last Name"
            isInvalid={!!errors.last_name}
          />
          <Form.Control.Feedback type="invalid">{errors.last_name}</Form.Control.Feedback>
        </Form.Group>
        </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>



        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
        </Form.Group>
        </Col>
        <Col xs={12} md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            isInvalid={!!errors.phone_number}
          />
          <Form.Control.Feedback type="invalid">{errors.phone_number}</Form.Control.Feedback>
        </Form.Group>
        </Col>
        </Row>      

        <Form.Group className="mb-1 input-group">
                    <Form.Control
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      className="form-control input-lg mt-3"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your Password"
                      required
                      style={{ paddingRight: "40px" }} // Add padding to prevent text overlap with the icon
                    />
                    <div
                      className="input-group-append position-absolute end-0 top-50 translate-middle-y"
                      style={{ zIndex: 10, paddingRight: "10px" }}
                    >
                      <button
                        type="button"
                        className="btn btn-link"
                        onClick={togglePasswordVisibility}
                        style={{
                          border: "none",
                          background: "transparent",
                          padding: 0,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={passwordVisible ? faEyeSlash : faEye}
                          style={{ color: "#6c757d" }}
                        />
                      </button>
                    </div>
                    </Form.Group>

                    <Row>
                    <Col xs={12} md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Birth Date</Form.Label>
          <Form.Control
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleInputChange}
            isInvalid={!!errors.birth_date}
          />
          <Form.Control.Feedback type="invalid">{errors.birth_date}</Form.Control.Feedback>
        </Form.Group>
</Col>
 <Col xs={12} md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            isInvalid={!!errors.gender}
          >
            <option value="">Select your Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
        </Form.Group>
        </Col>
        </Row>

        <Form.Group className="mb-3">
        <Form.Label>Please select your Zone</Form.Label>
        <Form.Select
                type="text"
                id="zone"
                name="zone"
                placeholder="Select your Zone"
                value={formData.zone}
                onChange={handleInputChange}
                isInvalid={!!errors.zone}
              >
                <option value="" disabled>
                  Select your zone
                </option>
                <option value="Awka zone">Awka zone</option>
                <option value="Nnewi zone">Nnewi zone</option>
                <option value="Owerri zone">Owerri zone</option>
                <option value="Ekwulobia zone">Ekwulobia zone</option>
                <option value="TLBC Onitsha">TLBC Onitsha</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.zone}</Form.Control.Feedback>
              </Form.Group>
            
            <div className="form-group submit-btn">
              <input
                type="submit"
                value={isLoading ? "Loading..." : "Submit"}
                disabled={isLoading}
                style={{ fontSize: "1em", fontWeight: "bold", backgroundColor: '#EE5007', border: 'none' }}
              />
            </div>
            {errors.submit && <Alert variant="danger" className="mt-3">{errors.submit}</Alert>}
          </Form>
        </div>
</Container>
    </>
  );
};

export default Register;
