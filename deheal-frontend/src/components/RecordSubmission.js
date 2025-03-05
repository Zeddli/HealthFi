// src/components/RecordSubmission.js
import React, { useState } from 'react';
import { createRecord } from '../api/api';

const RecordSubmission = () => {
  const [formData, setFormData] = useState({
    nric: '',
    recordHash: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createRecord(formData);
      setMessage(`Record added: ${response.data.txHash}`);
      setFormData({ nric: '', recordHash: '' });
    } catch (error) {
      console.error("Record submission error:", error);
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div>
      <h2>Submit Health Record</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nric"
          placeholder="Patient NRIC"
          value={formData.nric}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="recordHash"
          placeholder="Record Hash/Pointer"
          value={formData.recordHash}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Record</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RecordSubmission;
