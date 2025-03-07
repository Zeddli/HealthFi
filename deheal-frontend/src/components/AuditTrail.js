
import React, { useEffect, useState } from 'react';
import { getIdentityAuditLogs, getRecordAuditLogs } from '../api/api';

const AuditTrail = () => {
  const [identityLogs, setIdentityLogs] = useState([]);
  const [recordLogs, setRecordLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const identityResponse = await getIdentityAuditLogs();
        setIdentityLogs(identityResponse.data);
        const recordResponse = await getRecordAuditLogs();
        setRecordLogs(recordResponse.data);
      } catch (error) {
        console.error('Error fetching audit logs:', error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Audit Trail Dashboard</h2>
      <h3>User Registration Events</h3>
      <ul>
        {identityLogs.map((log, index) => (
          <li key={index}>
            <strong>NRIC:</strong> {log.args.nric} | <strong>Address:</strong> {log.args.user} | <strong>Time:</strong> {new Date(log.args.timestamp * 1000).toLocaleString()}
          </li>
        ))}
      </ul>
      <h3>Health Record Submission Events</h3>
      <ul>
        {recordLogs.map((log, index) => (
          <li key={index}>
            <strong>NRIC:</strong> {log.args.nric} | <strong>Submitted By:</strong> {log.args.submittedBy} | <strong>Record Hash:</strong> {log.args.recordHash} | <strong>Time:</strong> {new Date(log.args.timestamp * 1000).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuditTrail;
