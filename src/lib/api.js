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

export const getAuthToken = () => {
  return Cookies.get('token');
};

export const removeAuthCookie = () => {
  Cookies.remove('token');
};
