import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import CustomNavbar from "../Layouts/CustomNavbar";
import Footer from "../Layouts/Footer";
import authService from '../../Services/authService';
import '../Styles/Login.css';


function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  // });

  // const handleInputChange = (e) => {
  //   setError({});
  //   const { name, value } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

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


  //   try {
  //     const response = await fetch(
  //       "https://tlbc-platform-api.onrender.com/api/login/",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //         body: JSON.stringify(formData),
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       let errorData;

  //       try {
  //         errorData = JSON.parse(errorText);
  //       } catch {
  //         throw new Error("An unknown error occurred");
  //       }

  //       const firstErrorMessage = Object.values(errorData).flat()[0];
  //       throw new Error(firstErrorMessage);
  //     }

  //     if (response.ok) {
  //       const data = await response.json();
  //       localStorage.setItem("accessToken", data.access);
  //       localStorage.setItem("refreshToken", data.refresh);
      

  //       if (data.user.role === "admin" || data.user.role === "superadmin") {
  //         navigate("/admin");
  //       } else {
  //         navigate("/member");
  //       }
  //       console.log("Logged in successfully");
  //     } else {
  //       const errorText = await response.text();
  //       let errorData;
  //       try {
  //         errorData = JSON.parse(errorText);
  //       } catch {
  //         throw new Error("An unknown error occurred");
  //       }
  //       const firstErrorMessage = Object.values(errorData).flat()[0];
  //       throw new Error(firstErrorMessage);
  //     }
  //   } catch (error) {
  //     console.error("Error details:", error);
  //     alert("An error occurred: " + error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  return (
    <div className="login-page">
  
  <CustomNavbar />
    
    <div className="church-homepage">
        <Container className="login-container">
          <div className="login-card">
            <div className="card-body">
              <Form onSubmit={handleSubmit} className="form p-3">
              <h2 className="card-title text-center mt-2 mb-5">
                Login to your Profile
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
                  <a
                    href="/forgotpassword"
                    className="link font-weight-bolder forgotPasswordText"
                    style={{ fontSize: "1.3em", textDecoration: "none",  marginBottom: '5px', Color: 'black' }}
                  >
                    Forgot Password
                  </a>
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
          </div>
        </Container>
      </div>

      <Footer />
    </div>
 
  );
}

export default Login;
