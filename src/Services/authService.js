// src/services/authService.js

import axios from 'axios';

const API_URL = 'https://tlbc-platform-api.onrender.com/api';

const authService = {
  login: async (username, password) => {
    const response = await axios.post(`${API_URL}/login/`, { username, password });
    if (response.data.access) {
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      // Set the default authorization header for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      authService.setAuthHeader(response.data.access);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('firstName');
    localStorage.removeItem('userRole');
    // Remove the default authorization header
    delete axios.defaults.headers.common['Authorization'];
  },

  getUserInfo: async () => {
    const response = await axios.get(`${API_URL}/user/`);
    localStorage.setItem('firstName', response.data.first_name);
    localStorage.setItem('userRole', response.data.role);
    return response.data;
  },

  checkTokenValidity: async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return false;

    try {
      await axios.post(`${API_URL}/token/verify/`, { token: accessToken });
      return true;
    } catch (error) {
      return false;
    }
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    try {
      const response = await axios.post(`${API_URL}/token/refresh/`, { refresh: refreshToken });
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      // Update the default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      authService.setAuthHeader(response.data.access);
      return true;
    } catch (error) {
      return false;
    }
  },
  setAuthHeader: (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
};

export default authService;