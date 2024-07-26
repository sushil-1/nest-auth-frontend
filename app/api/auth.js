import axios from 'axios';
// change this base url if needed
const BASE_URL = 'http://localhost:5000/auth';

export const login = async (formData) => {
    const { username, password } = formData;
    const response = await axios.post(`${BASE_URL}/login`, { username, password });
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
    }
    return response.data;
  };

export const register = async (formData) => {
    const { username, password } = formData;
    const response = await axios.post(`${BASE_URL}/register`, { username, password });
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
    }
    return response.data;
};  

export const forgotPassword = async (username) => {
    const response = await axios.post(`${BASE_URL}/forgot-password`, { username });
    return response.data;
};

export const resetPassword = async (formData) => {
    console.log('forn data : ',formData);
    const { resetToken, newPassword } = formData;
    const response = await axios.post(`${BASE_URL}/reset-password`, { resetToken, newPassword });
    return response.data;
};

export const fetchProfile = async () => {
    const token = localStorage.getItem('access_token');
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
};
  
export const logout = () => {
    localStorage.removeItem('access_token');
};
