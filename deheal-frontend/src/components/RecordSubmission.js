// src/components/RecordSubmission.js
import React, { useState } from 'react';
import { healthRecordApi } from '../api/api';

const RecordSubmission = () => {
  const [formData, setFormData] = useState({
    patientNric: '',
    diagnosis: '',
    description: '',
    date: '',
    treatment: '',
    hospitalisation: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting record:", formData);
      const response = await healthRecordApi.create(formData);
      console.log("Response:", response);
      setMessage(`Record added: ${response.txHash}`);
      setFormData({
        patientNric: '',
        diagnosis: '',
        description: '',
        date: '',
        treatment: '',
        hospitalisation: ''
      });
    } catch (error) {
      console.error("Record submission error:", error);
      setMessage(`Error: ${error.message || "Failed to submit record"}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h2>Submit Health Record</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
        <input type="text" name="patientNric" placeholder="Patient NRIC" value={formData.patientNric} onChange={handleChange} required />
        <input type="text" name="diagnosis" placeholder="Diagnosis" value={formData.diagnosis} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="text" name="date" placeholder="Date (YYYY-MM-DD)" value={formData.date} onChange={handleChange} required />
        <input type="text" name="treatment" placeholder="Treatment" value={formData.treatment} onChange={handleChange} required />
        <input type="text" name="hospitalisation" placeholder="Hospitalisation" value={formData.hospitalisation} onChange={handleChange} required />
        <button type="submit">Submit Record</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RecordSubmission;
