import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import authService from '../../Services/authService';
import '../Styles/Login.css';


const Login = ({ onForgotPassword }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }


  const validateForm = (data) => {
    const newError = {};
    let isValid = true;

    if (!data.username) {
      newError.username = "Username is required";
      isValid = false;
    }

    if (!data.password) {
      newError.password = "Password is required";
      isValid = false;
    }

    setError(newError);
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
    setError('');

    try {
      await authService.login(formData.username, formData.password);
  
      // After successful login, getUserInfo will use the saved token
      const userInfo = await authService.getUserInfo();
      
      if (userInfo.role === 'admin' || userInfo.role === 'superadmin') {
        navigate('/admin');
      } else {
        navigate('/member');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (      
    <Container fluid >
     <Row className="justify-content-center">
     <Col xs={12} sm={10} md={8} lg={6}>
    <div className="login-card">
              <Form onSubmit={handleSubmit} className="form p-3">
              <h2 className="card-title text-center mt-2 mb-5" style={{ color: 'black', fontSize: '1em'}}>
                Login 
              </h2>
              <Form.Group className="mb-3 input-group">
                  <Form.Control
                    type="text"
                    id="username"
                    name="username"
                    className="form-control input-lg"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    required
                  />
                  </Form.Group>
                
                <span className="error" id="username-error">
                  {error.username}
                </span>

                <Form.Group className="mb-3 input-group">
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
                
                <div className="mb-3 d-flex justify-content-end forgotPassword">
                  <Button
                    variant="link"
                    onClick={onForgotPassword}
                    className="link font-weight-bolder forgotPasswordText d-flex justify-content-end forgotPassword"
                    style={{ fontSize: "1.1em", textDecoration: "none",  marginBottom: '5px', Color: 'black' }}
                  >
                    Forgot Password?
                  </Button>
                  </div>

                <button
                  type="submit"
                  className="btn btn-primary login-btn-lg w-100 font-weight-bold"
                  disabled={isLoading}
                  style={{ fontSize: "1.4em", fontWeight: "bolder", backgroundColor: '#EE5007', border: 'none' }}
                >
                  {isLoading ? "Loging in..." : "Login"}
                </button>
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                </Form>
              
            </div>    
            </Col>
            </Row>
            </Container>
  );
}

export default Login;
