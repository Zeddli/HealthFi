// src/components/Registration.js
import React, { useState } from 'react';
import { registerUser } from '../api/api';

const Registration = () => {
  const [formData, setFormData] = useState({
    nric: '',
    fullName: '',
    phone: '',
    department: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      setMessage(`Success: ${response.data.txHash}`);
      setFormData({ nric: '', fullName: '', phone: '', department: '' });
    } catch (error) {
      console.error("Registration error:", error);
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nric"
          placeholder="NRIC"
          value={formData.nric}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department (Hospital/Clinic/Insurance/Police/Court)"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Registration;
