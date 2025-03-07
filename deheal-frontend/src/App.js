// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './components/Login';
import Register from './pages/Register';
import RecordSubmission from './components/RecordSubmission';
import AuditTrail from './components/AuditTrail';
import DeployedRecords from './components/DeployedRecords';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submit-record" element={<RecordSubmission />} />
        <Route path="/audit-trail" element={<AuditTrail />} />
        <Route path="/deployed-records" element={<DeployedRecords />} />
      </Routes>
    </Router>
  );
}

export default App;
