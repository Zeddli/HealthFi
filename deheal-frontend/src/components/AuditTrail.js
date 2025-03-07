import React, { useEffect, useState } from 'react';
import { userApi, healthRecordApi } from '../api/api';

const AuditTrail = () => {
  const [userLogs, setUserLogs] = useState([]);
  const [recordLogs, setRecordLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch audit logs when the component mounts
  useEffect(() => {
    async function fetchAuditLogs() {
      try {
        const userResponse = await userApi.getAuditLogs();
        setUserLogs(userResponse);

        const recordResponse = await healthRecordApi.getAuditLogs();
        setRecordLogs(recordResponse);
      } catch (err) {
        console.error('Error fetching audit logs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAuditLogs();
  }, []);

  if (loading) return <p>Loading audit logs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Audit Trail Dashboard</h2>
      
      <section style={{ marginBottom: '2rem' }}>
        <h3>User Registration Events</h3>
        {userLogs.length === 0 ? (
          <p>No user registration events found.</p>
        ) : (
          <ul>
            {userLogs.map((log, index) => (
              <li key={index}>
                <strong>NRIC:</strong> {log.args.nric} | 
                <strong> User Contract:</strong> {log.args.userContract} | 
                <strong> Owner:</strong> {log.args.owner}
              </li>
            ))}
          </ul>
        )}
      </section>
      
      <section>
        <h3>Health Record Submission Events</h3>
        {recordLogs.length === 0 ? (
          <p>No health record submission events found.</p>
        ) : (
          <ul>
            {recordLogs.map((log, index) => (
              <li key={index}>
                <strong>Patient NRIC:</strong> {log.args.patientNric} | 
                <strong> Record Contract:</strong> {log.args.recordContract} | 
                <strong> Submitted By:</strong> {log.args.submittedBy} | 
                <strong> Timestamp:</strong> {new Date(log.args.timestamp * 1000).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AuditTrail;
