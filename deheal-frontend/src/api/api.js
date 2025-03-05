import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const createRecord = async (data) => {
  return await axios.post(`${API_BASE_URL}/record`, data);
};

export const getDeployedRecords = async (nric) => {
  return await axios.get(`${API_BASE_URL}/record/${nric}`);
};

export const getIdentityAuditLogs = async () => {
  return await axios.get(`${API_BASE_URL}/audit/identity`);
};

export const getRecordAuditLogs = async () => {
  return await axios.get(`${API_BASE_URL}/audit/records`);
};

export const registerUser = async (data) => {
  return await axios.post(`${API_BASE_URL}/register`, data);
};

