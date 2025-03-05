// src/components/DeployedRecords.js
import React, { useState, useEffect } from 'react';
import { getDeployedRecords } from '../api/api';

const DeployedRecords = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const response = await getDeployedRecords();
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching deployed records:", error);
      }
    }
    fetchRecords();
  }, []);

  return (
    <div>
      <h2>Deployed Health Record Contracts</h2>
      {records.length === 0 ? (
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
