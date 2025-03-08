import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Create axios instance with debug logging
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Debug logging for requests
api.interceptors.request.use(request => {
  console.log('Request:', {
    url: request.url,
    method: request.method,
    data: request.data
  });
  return request;
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
  checkTransaction: (txHash) => api.get(`/transaction/${txHash}`)
};

// Error interceptor with better logging
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error.response?.data || error);
  }
);

export default api;