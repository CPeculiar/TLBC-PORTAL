import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Facebook, Youtube, Book, Instagram } from "lucide-react";
import { FaTelegram, FaYoutube, FaTwitter } from "react-icons/fa";
import Footer from "./Footer";
import HeroSection from "../../assets/images/TLBCSlider2.png";
import "../Styles/Home.css";
import LoginForm from "../Auth/Login";
import RegisterForm from "../Auth/Register";
import ForgotPasswordForm from "../../Components/Auth/ForgotPassword";
import CustomNavbar from "./CustomNavbar";
import { FormProvider, useFormContext } from "../Contexts/FormContext";
import SupportForm from "../Layouts/Support";

const HomePageContent = () => {
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const {
    showLoginForm,
    showRegisterForm,
    showForgotPasswordForm,
    showSupportForm,
    handleLoginClick,
    handleRegisterClick,
    handleForgotPasswordClick,
    handleSupportClick,
    handleBackToHome,
  } = useFormContext();

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
        <Container fluid >
          <Row className="justify-content-center align-items-center h-100">
            <Col xs={12} md={8} lg={6}>
              <div className="hero-content text-center">
                {!showLoginForm &&
                  !showRegisterForm &&
                  !showForgotPasswordForm &&
                  !showSupportForm && (
                    <>
                      <div className="mb-4">
                        <Book size={0} className="text-warning" />
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
                        Register with your correct information to be able to
                        login to the portal.
                      </p>

                      <div
                        className={`button-container ${
                          buttonsVisible ? "fade-in" : ""
                        }`}
                        style={{ zIndex: 1, marginBottom: "2rem" }}
                      >
                        <Button
                          variant="warning"
                          size="lg"
                          className="w-50 custom-button me-2 mb-2"
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
                          className="w-50 custom-button mb-2"
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


                    </>
                  )}

                {showLoginForm && (
                  <div className="form-container">
                    <LoginForm onForgotPassword={handleForgotPasswordClick} />
                    <Button
                      variant="link"
                      className="mt-3 text-white back-to-home"
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
                      className="mt-3 text-white back-to-home"
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
                      className="mt-3 text-white back-to-home"
                      onClick={handleBackToHome}
                    >
                      Back to Home
                    </Button>
                  </div>
                )}

                {showSupportForm && (
                  <div className="form-container">
                    <SupportForm />
                    <Button
                      variant="link"
                      className="mt-3 text-white back-to-home"
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


        <div className="social-icons-container">
                        <ul className="social-icon d-flex">
                          <li className="social-icon-item">
                            <a
                              href="https://www.youtube.com/@thelordsbrethrenchurchintl"
                              className="social-icon-link"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                            <FaYoutube />
                              {/* <span className="bi-youtube"></span> */}
                            </a>
                          </li>
                          <li className="social-icon-item">
                            <a
                              href="https://web.facebook.com/thelordsbrethrenchurchintl"
                              className="social-icon-link"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                            <Facebook />
                            </a>
                          </li>
                          <li className="social-icon-item">
                            <a
                              href="https://t.me/TheLordsbrethrenchurchintl"
                              className="social-icon-link"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                            <FaTelegram />
                            </a>
                          </li>
                          <li className="social-icon-item">
                            <a
                              href="https://x.com/ElochukwuTLBC"
                              className="social-icon-link"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                            <FaTwitter />
                              {/* <span className="bi-twitter"></span> */}
                            </a>
                          </li>
                          <li className="social-icon-item">
                            <a
                              href="https://www.instagram.com/elochukwutlbc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                              className="social-icon-link"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                            <Instagram />
                              {/* <span className="bi-instagram"></span> */}
                            </a>
                          </li>
                        </ul>
                      </div>


      </div>
    </>
  );
};

const HomePage = () => (
  <FormProvider>
    <HomePageContent />
  </FormProvider>
);

export default HomePage;
