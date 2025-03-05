import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // adjust if hosted elsewhere
});

export const getIdentityAuditLogs = () => api.get('/audit/identity');
export const getRecordAuditLogs = () => api.get('/audit/records');


export const registerUser = (userData) => api.post('/register', userData);
export const addRecord = (recordData) => api.post('/record', recordData);
export const getAuditLogs = (type) => api.get(`/audit/${type}`);
export const getRecordsByNric = (nric) => api.get(`/record/${nric}`);

