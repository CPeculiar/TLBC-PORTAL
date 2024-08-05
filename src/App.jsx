import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Layouts/OldHomePage";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import UserDashboard from "./Components/Member/UserDashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import NotFound from "./Components/Layouts/NotFound";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Components/Layouts/HomePage'
import setupAxiosInterceptors from './Services/axiosConfig';
import SupportForm from './Components/Layouts/Support'


const PrivateRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem("userRole"); // assuming user role is saved in localStorage
  return allowedRoles.includes(userRole) ? children : <Navigate to="/" />;
};

const App = () => {

  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/member" element={<UserDashboard />} />
        <Route path="/support" element={<SupportForm />} />
        
        
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
