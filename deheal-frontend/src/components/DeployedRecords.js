// src/components/DeployedRecords.js
import React, { useState, useEffect } from 'react';
import { healthRecordApi } from '../api/api';

const DeployedRecords = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const response = await healthRecordApi.getDeployed();
        setRecords(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRecords();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Deployed Health Record Contracts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : records.length === 0 ? (
        <p>No records deployed yet.</p>
      ) : (
        <ul>
          {records.map((recordAddress, index) => (
            <li key={index}>
              Contract Address: <strong>{recordAddress}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeployedRecords;
