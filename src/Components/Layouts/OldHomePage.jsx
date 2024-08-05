import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/TLBC_LOGO_removebg.png'
import HeroImage from '../../assets/images/MOGsmiling.jpg'
import '../../App.css'

function Home() {
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonsVisible(true);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center min-vh-100 p-3">
      <div className="text-center mt-2">
        <img src={Logo} alt="Logo" className="mb-2" style={{ width: '150px', height: 'auto' }} />
        <h1 className="font-weight-bold">Welcome to TLBC Portal</h1>
      </div>
      <div 
        className="d-flex flex-column align-items-center justify-content-center w-100" 
        style={{ 
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(70%)',
          height: '90vh',
          width: '60vh',
          position: 'relative',
          margin: '20px auto',
          borderRadius: '10px',
          overflow: 'hidden'
        }}
      >
       
        <div className={`d-flex gap-3 ${buttonsVisible ? 'fade-in' : ''}`} 
        style={{ zIndex: 1, position: 'absolute', bottom: '40px' }}>
          <Link to="/login" className="btn btn-primary btn-lg">Login</Link>
          <Link to="/register" className="btn btn-secondary btn-lg">Register</Link>
        </div>
      </div>
      <p className="text-center mt-4" style={{ fontSize: '20px' }}
      >TLBC....calling men by the gospel into the Glory of God.
      </p>
    </div>
  );
}

export default Home;






/*

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Button, Container } from "react-bootstrap";
import { Facebook, Youtube, Book, Instagram } from "lucide-react";
import { FaTelegram, FaTiktok } from "react-icons/fa";
import Footer from "./Footer";
import HeroSection from "../../assets/images/TLBCSlider2.png";
import Logo from "../../assets/images/TLBC_LOGO_removebg.png";
import Image from "../../assets/images/MOGdancing.jpg";
import "../Styles/Home.css";

import CustomNavbar from "./CustomNavbar";

const Test = () => {
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonsVisible(true);
    }, 50); // 3 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomNavbar />

      <div
        className="hero-section position-relative text-white text-center d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${HeroSection})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
        }}
      >
        <div className="hero-content">
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
            Register with your correct information to be able to login to the
            portal.
          </p>

          <div
            className={` ${buttonsVisible ? "fade-in" : ""}`}
            style={{ zIndex: 1, bottom: "40px" }}
          >
            <Button
              variant="warning"
              size="lg"
              className="w-50 custom-button"
              style={{
                fontWeight: "bolder",
                fontSize: "1.5em",
                color: "black",
              }}
            >
              {" "}
              <Link
                to="/login"
                style={{ color: "black", textDecoration: "none" }}
              >
                Login
              </Link>
            </Button>
          </div>
        </div>
        
      </div>
      <ul className="social-icon d-flex justify-content-lg-start" style={{marginTop: "-20px", zIndex: '30000'}}>
                                    <li className="social-icon-item">
                                        <a href="https://x.com/ElochukwuTLBC" className="social-icon-link" target='_blank'>
                                            <span className="bi-twitter"></span>
                                        </a>
                                    </li>

                                    <li className="social-icon-item">
                                        <a href="https://t.me/TheLordsbrethrenchurchintl" className="social-icon-link" target='_blank'>
                                            <span className="bi-telegram"></span>
                                        </a>
                                    </li>

                                    <li className="social-icon-item">
                                        <a href="https://www.instagram.com/elochukwutlbc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="social-icon-link" target='_blank'>
                                            <span className="bi-instagram"></span>
                                        </a>
                                    </li>

                                    <li className="social-icon-item">
                                        <a href="https://www.youtube.com/@thelordsbrethrenchurchintl" className="social-icon-link" target='_blank'>
                                            <span className="bi-youtube"></span>
                                        </a>
                                    </li>

                                    <li className="social-icon-item">
                                        <a href="https://web.facebook.com/thelordsbrethrenchurchintl" className="social-icon-link" target='_blank'>
                                            <span className="bi-facebook"></span>
                                        </a>
                                    </li>
                                </ul>

      {/* <Container className="mt-n5 position-relative">
        <div className="bg-white p-4 shadow-sm rounded">
          <div className="row align-items-center">
            <div className="col-md-4">
              <img
                src={Image}
                alt="Church service"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-8">
              <span className="badge bg-danger mb-2">LIVE</span>
              <h2 className="mb-3">
                Welcome,
                <br />
                Click below to join us online.
              </h2>

              <div className="d-flex">
                <Button
                  variant="outline-secondary"
                  className="me-2 icon-button"
                >
                  <a
                    href="https://www.youtube.com/@thelordsbrethrenchurchintl"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "red" }}
                  >
                    {" "}
                    <Youtube size={26} />{" "}
                  </a>{" "}
                </Button>

                <Button
                  variant="outline-secondary"
                  className="me-2 icon-button"
                >
                  <a
                    href="https://web.facebook.com/thelordsbrethrenchurchintl"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#3b5998" }}
                  >
                    {" "}
                    <Facebook size={26} />{" "}
                  </a>{" "}
                </Button>
                <Button
                  variant="outline-secondary"
                  className="me-2 icon-button"
                >
                  <a
                    href="https://t.me/TheLordsbrethrenchurchintl"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0088cc" }}
                  >
                    <FaTelegram size={20} />
                  </a>
                </Button>
                <Button
                  variant="outline-secondary"
                  className="me-2 icon-button"
                >
                  <a
                    href="https://www.instagram.com/elochukwutlbc"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#E1306C" }}
                  >
                    <Instagram size={20} />
                  </a>
                </Button>
                <Button variant="outline-secondary icon-button">
                  <a
                    href="https://www.tiktok.com/@elochukwutlbc"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#000000" }}
                  >
                    <FaTiktok size={20} />{" "}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>

       </div> 
      </>
    );
  };
  
  export default Test;
  


 */