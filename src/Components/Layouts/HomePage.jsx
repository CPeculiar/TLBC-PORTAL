import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Button, Container } from "react-bootstrap";
import { Facebook, Youtube, Book, Instagram } from "lucide-react";
import { FaTelegram, FaTiktok } from "react-icons/fa";
import Footer from "./Footer";
import HeroSection from "../../assets/images/TLBCSlider2.png";
import Logo from "../../assets/images/TLBC_LOGO_removebg.png";
import Image from "../../assets/images/MOGdancing.jpg";
import "../Styles/Home.css";
import ContactSection from "./ContactSection";
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
    // <div className="church-homepage">
    //   <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
    //     <Container className="d-flex justify-content-between align-items-center custom-container">
    //       <Navbar.Brand href="#home" className="d-flex align-items-center">
    //         {/* <span className="text-warning me-2">†</span> Deeds<sup>2</sup> */}
    //         <img src={Logo} alt="logo" className="custom-logo" />
    //       </Navbar.Brand>
    //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //       <Navbar.Collapse id="basic-navbar-nav">
    //         <Nav className="ms-auto">
    //           <Nav.Link href="#home">Home</Nav.Link>
    //           <Nav.Link href="/register">Register</Nav.Link>
    //           <Nav.Link href="/login">Login</Nav.Link>
    //         </Nav>
    //       </Navbar.Collapse>
    //     </Container>
    //   </Navbar>
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

      <Container className="mt-n5 position-relative">
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

      <ContactSection />
      <Footer /> 
    {/* </div> */}
    </>
  );
};

export default Test;
