import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// API endpoints
export const userApi = {
  register: (userData) => api.post('/user', userData),
  getAuditLogs: () => api.get('/audit/user')
};

export const healthRecordApi = {
  create: (recordData) => api.post('/healthrecord', recordData),
  getAuditLogs: () => api.get('/audit/record'),
  getDeployed: () => api.get('/deployed-records'),
  // Add transaction status check
  checkTransaction: (txHash) => api.get(`/transaction/${txHash}`)
};

// Error interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);

export default api;