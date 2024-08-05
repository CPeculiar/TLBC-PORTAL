import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Facebook, Youtube, Book, Instagram } from "lucide-react";
import { FaTelegram, FaTiktok } from "react-icons/fa";
import Footer from "./Footer";
import HeroSection from "../../assets/images/TLBCSlider2.png";
import "../Styles/Home.css";
import LoginForm from "../Auth/Login";
import RegisterForm from "../Auth/Register";
import ForgotPasswordForm from "../../Components/Auth/ForgotPassword"

import CustomNavbar from "./CustomNavbar";

const HomePage = () => {
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonsVisible(true);
    }, 50); 

    return () => clearTimeout(timer);
  }, []);

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordForm(true);
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };

  const handleBackToHome = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
    setShowForgotPasswordForm(false);
  };

  return (
    <>
      <CustomNavbar />

      <div
        className="hero-section position-relative text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${HeroSection})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          padding: "2rem",
        }}
      >
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <div className="hero-content text-center">
                {!showLoginForm && !showRegisterForm && !showForgotPasswordForm && (
                  <>
                    <div className="mb-4">
                      <Book size={48} className="text-warning" />
                    </div>
                    <h1 className="display-4 fw-bold mb-3">
                      Welcome to
                      <br />
                      TLBC Portal
                    </h1>
                    <p
                      className="lead mb-4"
                      style={{ color: "white", fontStyle: "italic" }}
                    >
                      This is a portal for the members of TLBC International
                      <br />
                      Register with your correct information to be able to login to the
                      portal.
                    </p>

                    <div
                      className={`${buttonsVisible ? "fade-in" : ""}`}
                      style={{ zIndex: 1, marginBottom: "2rem" }}
                    >
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
              


          <div className="social-icons">
          <ul className="social-icon d-flex">
          <li className="social-icon-item">
              <a
                href="https://www.youtube.com/@thelordsbrethrenchurchintl"
                className="social-icon-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="bi-youtube"></span>
              </a>
            </li>
            <li className="social-icon-item">
              <a
                href="https://web.facebook.com/thelordsbrethrenchurchintl"
                className="social-icon-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="bi-facebook"></span>
              </a>
            </li>
            <li className="social-icon-item">
              <a
                href="https://t.me/TheLordsbrethrenchurchintl"
                className="social-icon-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="bi-telegram"></span>
              </a>
            </li>
            <li className="social-icon-item">
              <a
                href="https://x.com/ElochukwuTLBC"
                className="social-icon-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="bi-twitter"></span>
              </a>
            </li>
            <li className="social-icon-item">
              <a
                href="https://www.instagram.com/elochukwutlbc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                className="social-icon-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="bi-instagram"></span>
              </a>
            </li>
          </ul>
        </div>      

        </>
                )}

                {showLoginForm && (
                  <div className="form-container">
                    <LoginForm onForgotPassword={handleForgotPasswordClick} />
                    <Button
                      variant="link"
                      className="mt-3 text-white"
                      onClick={handleBackToHome}
                    >
                      Back to Home
                    </Button>
                  </div>
                )}

                {showRegisterForm && (
                  <div className="form-container">
                    <RegisterForm />
                    <Button
                      variant="link"
                      className="mt-3 text-white"
                      onClick={handleBackToHome}
                    >
                      Back to Home
                    </Button>
                  </div>
                )}

                {showForgotPasswordForm && (
                  <div className="form-container">
                    <ForgotPasswordForm />
                    <Button
                      variant="link"
                      className="mt-3 text-white"
                      onClick={handleBackToHome}
                    >
                      Back to Home
                    </Button>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default HomePage;
