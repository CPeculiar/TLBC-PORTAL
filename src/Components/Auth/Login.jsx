import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/images/TLBC_LOGO_removebg.png";
import '../Styles/Login.css';

function Login() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = (data) => {
    const newErrors = {};
    let isValid = true;

    if (!data.username) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!data.password) {
      newErrors.password = "Password is required";
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
        "https://tlbc-platform-api.onrender.com/api/login/",
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

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        navigate("/admin");
        console.log("Logged in successfully");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error details:", error);
      alert("An error occurred: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="login-container d-flex flex-column align-items-center justify-content-center min-vh-100"
      // style={{ marginTop: "-8em" }}
    >
      <img
        src={Logo}
        alt="Logo"
        className="mb-4 login-logo"
        // style={{ width: "220px", height: "auto" }}
      />
      <div className="row justify-content-center w-100">
        <div className="col-md-6">
          <div className="login-card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                Login to your Profile
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control input-lg"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    required
                  />
                </div>
                <span className="error" id="username-error">
                  {errors.username}
                </span>

                <div className="mb-3">
                  <div className="input-group">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      className="form-control input-lg"
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
                  </div>
                </div>
                <div className="mb-3 d-flex justify-content-end">
                  <a
                    href="#"
                    className="link-primary font-weight-bold"
                    style={{ fontSize: "1.3em", textDecoration: "none" }}
                  >
                    Forgot Password
                  </a>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary login-btn-lg w-100 font-weight-bold"
                  disabled={isLoading}
                  style={{ fontSize: "1.4em", fontWeight: "bolder" }}
                >
                  {isLoading ? "Loging in..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
