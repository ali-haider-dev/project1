import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'https://express-api-black-kappa.vercel.app/api/auth';

export const authApi = {
  signup: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, {
        ...data,
        role: data.role || 'user',
      });
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw { message: 'Network error. Please try again.' };
    }
  },

  login: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, data);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw { message: 'Network error. Please try again.' };
    }
  },
};

export const setAuthCookie = (token) => {
  // Set cookie to expire in 3 hours
  Cookies.set('token', token, { 
    expires: 3 / 24, // 3 hours in days
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  });
};

export const setUserData = (user) => {
  // Store user data in localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const getUserData = () => {
  // Retrieve user data from localStorage
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

export const removeUserData = () => {
  // Remove user data from localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};

export const getAuthToken = () => {
  return Cookies.get('token');
};

export const removeAuthCookie = () => {
  Cookies.remove('token');
  removeUserData(); // Also remove user data
};
