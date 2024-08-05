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
      
        {/* <div className="site-footer-top" style={{height: '40px', paddingTop: '0px'}}> */}
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
       
      
      
    </>
  );
};

export default Footer;
