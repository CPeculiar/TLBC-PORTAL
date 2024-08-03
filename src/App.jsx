import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Layouts/Home";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import UserDashboard from "./Components/Member/UserDashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import NotFound from "./Components/Layouts/NotFound";
import Navbar from "./Components/Layouts/Navbar.";
import 'bootstrap/dist/css/bootstrap.min.css';
import Test from "./Components/Layouts/Test";

const PrivateRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem("userRole"); // assuming user role is saved in localStorage
  return allowedRoles.includes(userRole) ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/member" element={<UserDashboard />} />
        <Route path="/test" element={<Test />} />
        
        <Route 
          path="/admin" 
            element={
             <PrivateRoute allowedRoles={['admin', 'superadmin']}>
             <AdminDashboard />
              </PrivateRoute>
            }
              />
              <Route path="*" element={<NotFound />} />
        
      </Routes>
    </Router>
  );
};

export default App;
