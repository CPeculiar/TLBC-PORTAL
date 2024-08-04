import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Register.css";

const Footer = () => {

  const handleFooterLinkClick = (event, url) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    window.location.href = url;
  };

  return (
    <>
      <footer className="site-footer">
        <div className="site-footer-top"></div>

        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 mb-4 pb-2">
              <h5 className="site-footer-title mb-3">Links</h5>

              <ul className="site-footer-links">
                <li className="site-footer-link-item">
                  <Link
                    to={`/`}
                    className="site-footer-link"
                    style={{ textDecoration: "none" }}
                    onClick={(event) => handleFooterLinkClick(event, "/")}
                  >
                    Home
                  </Link>
                </li>

                <li className="site-footer-link-item">
                  <Link
                    to={`/register`}
                    className="site-footer-link"
                    style={{ textDecoration: "none" }}
                    onClick={(event) =>
                      handleFooterLinkClick(event, "/register")
                    }
                  >
                    Register
                  </Link>
                </li>

                <li className="site-footer-link-item">
                  <Link
                    to={`/login`}
                    className="site-footer-link"
                    style={{ textDecoration: "none" }}
                    onClick={(event) => handleFooterLinkClick(event, "/login")}
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
              <h5 className="site-footer-title mb-3">Have any question?</h5>

              <p className="text-white d-flex mb-1">
                <a
                  href="tel: 0913-444-5037"
                  className="site-footer-link"
                  style={{ textDecoration: "none" }}
                >
                  0913-444-5037
                </a>
              </p>

              <p className="text-white d-flex">
                <a
                  href="mailto:info@thelordsbrethrenchurch.org"
                  className="site-footer-link"
                  style={{ textDecoration: "none" }}
                >
                  info@thelordsbrethrenchurch.org
                </a>
              </p>
            </div>

            <div className="col-lg-3 col-md-6 col-11 mb-4 mb-lg-0 mb-md-0">
              <h5 className="site-footer-title mb-3">Location</h5>

              <p className="text-white d-flex mt-3 mb-2">
                The Lord's Brethren Church Auditorium, <br />
                3 Uche Ekwunife Crescent, <br /> (off Kwata Junction), Awka{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <div className="container">
            <p className="text-center text-white pt-4">TLBC....calling men by the gospel into the Glory of God || Copyright © 2024</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
