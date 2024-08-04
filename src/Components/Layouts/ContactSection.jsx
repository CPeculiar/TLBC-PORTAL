import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactSection = () => {
  const [activeTab, setActiveTab] = useState("ContactForm");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    church: "",
    message: "",
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
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.church.trim()) errors.church = "Name of Church is required";
    if (!formData.message.trim()) errors.message = "Message is required";
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
      errors.phone = "Phone number is invalid";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
        setIsSubmitting(true);
        setIsSuccess(false); // Reset success state
      
      try {
        const response = await emailjs.send(
          "service_9y9qd0r",
          "template_cywtduf",
          {
            to_email: "chukwudipeculiar@gmail.com",
            from_name: formData.name,
            from_phone: formData.phone,
            from_email: formData.email,
            church: formData.church,
            message: formData.message,
          },
          "G0uRp4jJwwELDgewX"
        );

        if (response.status === 200) {
          alert("Message sent successfully!");
          setFormData({
            name: "",
            phone: "",
            email: "",
            church: "",
            message: "",
          });
          setIsSuccess(true);
        } else {
          alert("Failed to send message. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }finally {
        setIsSubmitting(false); // Reset submitting state
      }
    } else {
      setFormErrors(errors);
      setIsSubmitting(false); // Reset submitting state in case of validation errors
    } 
  };

  return (
    <section className="contact-section section-padding" id="section_6" style={{marginTop: '0', paddingTop: '0'}}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12 mx-auto">
            <h2 className="text-center mb-4">Have any question? <br/> Send us a message</h2>

            <nav className="d-flex justify-content-center">
              <div
                className="nav nav-tabs align-items-baseline justify-content-center"
                id="nav-tab"
                role="tablist"
              >
                <button
                  className="nav-link active"
                  id="nav-ContactForm-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-ContactForm"
                  type="button"
                  role="tab"
                  aria-controls="nav-ContactForm"
                  aria-selected="false"
                >
                  <h5>Contact Form</h5>
                </button>

                <button
                  className="nav-link"
                  id="nav-ContactMap-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-ContactMap"
                  type="button"
                  role="tab"
                  aria-controls="nav-ContactMap"
                  aria-selected="false"
                >
                  <h5>Google Map</h5>
                </button>
              </div>
            </nav>

            <div className="tab-content shadow-lg mt-5" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-ContactForm"
                role="tabpanel"
                aria-labelledby="nav-ContactForm-tab"
              >
                {activeTab === "ContactForm" && (
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
                            <p style={{ color: "red" }}>{formErrors.name}</p>
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
                            <p style={{ color: "red" }}>{formErrors.phone}</p>
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
                            <p style={{ color: "red" }}>{formErrors.email}</p>
                          )}
                        </div>
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
                    <p style={{ color: "red" }}>{formErrors.email}</p>
                  )}
                </div>

                    <div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="3"
                        className="form-control"
                        id="message"
                        placeholder="Message"
                      ></textarea>
                      {formErrors.message && (
                        <p style={{ color: "red" }}>{formErrors.church}</p>
                  )}
                      </div>

                      <div className="col-lg-4 col-md-10 col-8 mx-auto">
                        <button type="submit" className="form-control "
                        disabled={isSubmitting}
                        style={{
      borderRadius: '19px',
      fontSize: '1rem', // Default font size
      padding: '0.5rem 1rem', // Default padding
      width: '100%', // Full width on mobile
      maxWidth: '300px', // Max width on larger screens
      margin: '0 auto', // Centering the button
    }}
                        >
                        {isSubmitting ? "Submitting..." : "Send message"}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>

            
            
            


              <div
                className="tab-pane fade"
                id="nav-ContactMap"
                role="tabpanel"
                aria-labelledby="nav-ContactMap-tab"
              >
                <iframe
                  className="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3456853358566!2d7.056821773041316!3d6.218063326641412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1043830c5d178e93%3A0x3305b6015697a207!2sThe%20Lords%20Brethren%20Place%2C%20Awka!5e0!3m2!1sen!2sng!4v1703920380110!5m2!1sen!2sng"
                  width="600"
                  height="450"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;
