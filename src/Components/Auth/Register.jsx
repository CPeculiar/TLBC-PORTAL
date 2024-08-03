import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Country, State } from "country-state-city";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import Navbar from "../../Components/Navbar";
// import Footer from "../../Components/Footer";
import "../Styles/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [residenceState, setResidenceState] = useState(null);
  const [showEnrolledInWfs, setShowEnrolledInWfs] = useState(true);
  const [states, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "", 
    username: "", 
    password: "",
    birth_date: "",
    gender: "", 
    phone_number: "",
    country: "", 
    origin_state: "", //state of origin
    address: "",
    perm_address: "",
    city: "",
    state: "", //state of residence
    church: "", 
    zone: "", 
    joined_at: "", 
    invited_by: "", 
    first_min_arm: "", 
    current_min_arm: "", 
    current_offices: "", 
    previous_offices: "", 
    suspension_record: "", 
    wfs_graduation_year: null, 
    enrolled_in_wfs: "", 
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === 'wfs_graduation_year') {
      if (value) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          enrolled_in_wfs: "false",
        }));
        setShowEnrolledInWfs(false);
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          wfs_graduation_year: null,
          enrolled_in_wfs: "",
        }));
        setShowEnrolledInWfs(true);
      }
    }
  };

  const validateForm = (data) => {
    const newErrors = {};
    let isValid = true;

    if (!data.first_name) {
      newErrors.first_name = "Firstname is required";
      isValid = false;
    }

    if (!data.last_name) {
      newErrors.last_name = "Lastname is required";
      isValid = false;
    }

    if (!data.username) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!data.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (!data.birth_date) {
      newErrors.birth_date = "Birth Date is required";
      isValid = false;
    }

    if (!validatePhone(data.phone_number)) {
      newErrors.phone_number = "Invalid phone number";
      isValid = false;
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    if (!formData.origin_state) {
      newErrors.origin_state = "State of Origin is required";
    }

    if (!data.address) {
      newErrors.address = "Residential Address is required";
      isValid = false;
    }

    if (!data.perm_address) {
      newErrors.perm_address = "Permanent Address is required";
      isValid = false;
    }

    if (!data.city) {
      newErrors.city = "City is required";
      isValid = false;
    }

    if (!data.state) {
      newErrors.state = "State of residence is required";
      isValid = false;
    }

    if (!data.gender) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }

    if (!data.church) {
      newErrors.church = "Please enter the name of your Church";
      isValid = false;
    }

    if (!data.zone) {
      newErrors.zone = "Please select your zone";
      isValid = false;
    }

    if (!data.joined_at) {
      newErrors.joined_at = "Please select the date you joined our Ministry";
      isValid = false;
    }

    if (!data.invited_by) {
      newErrors.invited_by =
        "Please enter the full name of the person who invited you to our Ministry";
      isValid = false;
    }

    if (!data.first_min_arm) {
      newErrors.first_min_arm =
        "Please enter the first ministry arm you joined";
      isValid = false;
    }

    if (!data.current_min_arm) {
      newErrors.current_min_arm =
        "Please enter the current ministry arm(s) you are a part of";
      isValid = false;
    }

    // if (!data.wfs_graduation_year) {
    //   newErrors.wfs_graduation_year =
    //     "Please enter the year you graduated from WFS";
    //   isValid = false;
    // }

    if (!data.enrolled_in_wfs) {
      newErrors.enrolled_in_wfs = "Please select an option";
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
        "https://tlbc-platform-api.onrender.com/api/onboarding/",
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
        // throw new Error(`HTTP error! status: ${response.status}`);
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
        localStorage.setItem("firstName", data.user.first_name);
        localStorage.setItem("userRole", data.user.role);

       if (data.user.role === "admin" || data.user.role === "superadmin") {
        navigate("/admin");
      } else {
        navigate("/member");
      }
        console.log("Logged in successfully");
      } else {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          throw new Error("An unknown error occurred");
        }
        const firstErrorMessage = Object.values(errorData).flat()[0];
        throw new Error(firstErrorMessage);
      }
    } catch (error) {
      console.error("Error details:", error);
      alert("An error occurred: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const validatePhone = (phone) => {
    const re = /^\d{11}$/;
    return re.test(String(phone));
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setStates(State.getStatesOfCountry(country.value));
    setSelectedState(null);
    setResidenceState(null);
    setFormData({ ...formData, country: country.label, origin_state: "", state: "" });
    setErrors({ ...errors, country: "", origin_state: "", state: "" });
  };

  const handleStateChange = (origin_state) => {
    setSelectedState(origin_state);
    setFormData({ ...formData, origin_state: origin_state.label });
    setErrors({ ...errors, origin_state: "" });
  };
  

  const handleResidenceStateChange = (state) => {
    setResidenceState(state);
    setFormData({ ...formData, state: state.label });
    setErrors({ ...errors, state: "" });
  };

  const countries = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const statesOptions = states.map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  const handleProfilePictureChange = (e) => {
    if (e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
      setErrors((prevErrors) => ({ ...prevErrors, profilePicture: "" }));
    }
  };

  return (
    <>
      <section className="hero-section" id="section_1">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="">
            <div className="col-12 mt-4 mb-5 text-center">
              <h2 className="text-white mb-1" id="annual">
                Onboarding!
              </h2>
              <p className="text-white">
                Kindly fill the form below to be onboarded into the portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="registration-container">
        <div className="register-form">
          <form id="registration-form" method="post" onSubmit={handleSubmit}>
            <h2
              className="card-title text-center mb-4"
              style={{ color: "#007bff", fontWeight: "bold" }}
            >
              Registration Form
            </h2>
            <div className="form-group first_name">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="Enter your First Name"
                value={formData.first_name}
                onChange={handleInputChange}
              />
              <span className="error" id="first_name-error">
                {errors.first_name}
              </span>
            </div>
            <div className="form-group last_name">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Enter your Last Name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
              <span className="error" id="last_name-error">
                {errors.last_name}
              </span>
            </div>

            <div className="form-group email">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group username">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <span className="error" id="username-error">
                {errors.username}
              </span>
            </div>

            <div className="form-group password">
              <label htmlFor="password" className="form-label">
                Password (must not be less than 8 in number)
              </label>
              <div className="input-group">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="form-control"
                  name="password"
                  id="password"
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
              {errors.password && (
                <span className="text-danger">{errors.password}</span>
              )}
            </div>

            <div className="form-group birth_date">
              <label htmlFor="birth_date">Birth Date</label>
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                placeholder="Select your date"
                value={formData.birth_date}
                onChange={handleInputChange}
              />
              <span className="error" id="birth_date-error">
                {errors.birth_date}
              </span>
            </div>

            <div className="form-group gender">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="" selected disabled>
                Select your Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <span className="error" id="gender-error">
                {errors.gender}
              </span>
            </div>  

            <div className="form-group phone_number">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                placeholder="Enter your phone number"
                value={formData.phone_number}
                onChange={(e) => {
                  const regex = /^[0-9+]*$/;
                  if (regex.test(e.target.value)) {
                    handleInputChange(e);
                  }
                }}
              />
              <span className="error" id="phone_number-error">
                {errors.phone_number}
              </span>
            </div>

            <div className="form-group country" id="country">
              <label htmlFor="country">Country </label>
              <Select
                id="country"
                name="country"
                options={countries}
                value={selectedCountry}
                onChange={handleCountryChange}
                placeholder="Select your country"
                isClearable
                className="react-select-container"
                classNamePrefix="react-select"
                required
              />
              {errors.country && (
                <span className="error">{errors.country}</span>
              )}
            </div>
            <div className="form-group origin_state" id="origin_state">
              <label htmlFor="origin_state">State of Origin</label>
              <Select
                id="origin_state"
                name="origin_state"
                options={statesOptions}
                value={selectedState}
                onChange={handleStateChange}
                placeholder="Select your state of origin"
                isClearable
                isDisabled={!selectedCountry}
                className="react-select-container"
                classNamePrefix="react-select"
                required
              />
              {errors.origin_state && (
                <span className="error">{errors.origin_state}</span>
              )}
            </div>

            <div className="form-group perm_address">
              <label htmlFor="perm_address">
                Permanent Address
              </label>
              <input
                type="text"
                id="perm_address"
                name="perm_address"
                placeholder="Enter your permanent address"
                value={formData.perm_address}
                onChange={handleInputChange}
              />
              <span className="error" id="perm_address-error">
                {errors.perm_address}
              </span>
            </div>

            <div className="form-group state" id="state">
              <label htmlFor="state">State of Residence</label>
              <Select
                id="state"
                name="state"
                options={statesOptions}
                value={residenceState}
                onChange={handleResidenceStateChange}
                placeholder="Select your state of residence"
                isClearable
                isDisabled={!selectedCountry}
                className="react-select-container"
                classNamePrefix="react-select"
                required
              />
              {errors.state && (
                <span className="error">{errors.state}</span>
              )}
            </div>

            <div className="form-group address">
              <label htmlFor="address">
                Residential Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your residential address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <span className="error" id="address-error">
                {errors.address}
              </span>
            </div>

            <div className="form-group city">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleInputChange}
              />
              <span className="error" id="city-error">
                {errors.city}
              </span>
            </div>

            <div className="form-group church">
              <label htmlFor="church">Church</label>
              <input
                type="text"
                id="church"
                name="church"
                placeholder="Enter the name of your Church"
                value={formData.church}
                onChange={handleInputChange}
              />
              <span className="error" id="church-error">
                {errors.church}
              </span>
            </div>

            <div className="form-group zone" id="zone">
              <label htmlFor="zone">Please select your Zone</label>
              <select
                type="text"
                id="zone"
                name="zone"
                placeholder="Select your Zone"
                value={formData.zone}
                onChange={handleInputChange}
              >
                <option value="" selected disabled>
                  Select your zone
                </option>
                <option value="Awka zone">Awka zone</option>
                <option value="Nnewi zone">Nnewi zone</option>
                <option value="Owerri zone">Owerri zone</option>
                <option value="Ekwulobia zone">Ekwulobia zone</option>
                <option value="TLBC Onitsha">TLBC Onitsha</option>
                <option value="TLBCM UNILAG">TLBCM UNILAG</option>
              </select>
              <span className="error" id="zone-error">
                {errors.zone}
              </span>
            </div>

            <div className="form-group joined_at">
              <label htmlFor="joined_at">Date of joining the Ministry</label>
              <input
                type="date"
                id="joined_at"
                name="joined_at"
                placeholder="Select the date you joined the ministry"
                value={formData.joined_at}
                onChange={handleInputChange}
              />
              <span className="error" id="joined_at-error">
                {errors.joined_at}
              </span>
            </div>

            <div className="form-group invited_by">
              <label htmlFor="invited_by">
                Who invited you to the Ministry?
              </label>
              <input
                type="text"
                id="invited_by"
                name="invited_by"
                placeholder="Enter the name of the person who invited you to the ministry"
                value={formData.invited_by}
                onChange={handleInputChange}
              />
              <span className="error" id="invited_by-error">
                {errors.invited_by}
              </span>
            </div>

            <div className="form-group first_min_arm">
              <label htmlFor="first_min_arm">
                First ministry Arm you joined
              </label>
              <input
                type="text"
                id="first_min_arm"
                name="first_min_arm"
                placeholder="Enter the first ministry arm you joined"
                value={formData.first_min_arm}
                onChange={handleInputChange}
              />
              <span className="error" id="first_min_arm-error">
                {errors.first_min_arm}
              </span>
            </div>

            <div className="form-group current_min_arm">
              <label htmlFor="current_min_arm">Which Ministry Arm do you currently serve in? </label>
              <input
                type="text"
                id="current_min_arm"
                name="current_min_arm"
                placeholder="Enter your current ministry arm(s)"
                value={formData.current_min_arm}
                onChange={handleInputChange}
              />
              <span className="error" id="current_min_arm-error">
                {errors.current_min_arm}
              </span>
            </div>

            <div className="form-group current_offices">
              <label htmlFor="current_offices">Your Current Position <br/>
               (If it is more than one, please write them all):
              </label>
              <input
                type="text"
                id="current_offices"
                name="current_offices"
                placeholder="Enter your current ministry offices"
                value={formData.current_offices}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group previous_offices">
              <label htmlFor="previous_offices">
              Previous Ministry offices held and Year <br/> 
              (Eg: Secretary TLBCM Awka 2001-2003, VP TLTN Nkpor, 2010-2015, etc) {" "}
              </label>
              <input
                type="text"
                id="previous_offices"
                name="previous_offices"
                placeholder="Enter your previous ministry offices"
                value={formData.previous_offices}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group suspension_record">
              <label htmlFor="suspension_record">
              Any record of Suspension/withdrawal from Office in the Past?  <br/>
              (Eg: Year 2016: Suspended from the office TLBC Awka secretary for double lateness. 
              Year 2020: Withdrawn from the office VP TLTN for insubordination of authority to my leaders. Etc)  
              </label>
              <input
                type="text"
                id="suspension_record"
                name="suspension_record"
                placeholder="Enter your suspension records (if any)"
                value={formData.suspension_record}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group wfs_graduation_year">
              <label htmlFor="wfs_graduation_year">
                Year of WFS graduation
              </label>
              <input
                type="number"
                id="wfs_graduation_year"
                name="wfs_graduation_year"
                placeholder="Enter the year you graduated from WFS"
                value={formData.wfs_graduation_year || ""}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "e" || e.key === "." || e.key === "-") {
                    e.preventDefault();
                  }
                }}
                min="1900"
                max={new Date().getFullYear()}
              />
              <span className="error" id="wfs_graduation_year-error">
                {errors.wfs_graduation_year}
              </span>
            </div>

            {showEnrolledInWfs && (
            <div className="form-group enrolled_in_wfs">
              <label htmlFor="enrolled_in_wfs">Have you enrolled in WFS?</label>
              <select
                id="enrolled_in_wfs"
                name="enrolled_in_wfs"
                value={formData.enrolled_in_wfs}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Choose an option
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <span className="error" id="enrolled_in_wfs-error">
                {errors.enrolled_in_wfs}
              </span>
            </div>
            )}
            {/* 
            <div className="form-group mb-3">
                  <label htmlFor="profilePicture" className="form-label">Upload a Profile Picture</label>
                  <input
                    type="file"
                    className="form-control"
                    name="profilePicture"
                    id="profilePicture"
                    onChange={handleProfilePictureChange}
                    accept="image/*"
                    required
                  />
                  {errors.profilePicture && <span className="text-danger">{errors.profilePicture}</span>}
                </div> */}

            <div className="form-group submit-btn">
              <input
                type="submit"
                value={isLoading ? "Loading..." : "Submit"}
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
