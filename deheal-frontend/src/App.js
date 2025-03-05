// import logo from './logo.svg';
import './App.css';
import React from 'react';
import Registration from './components/Registration';
import RecordSubmission from './components/RecordSubmission';
import AuditTrail from './components/AuditTrail';

function App() {
  return (
    <div className="App">
      <h1>DeHeal</h1>
      <Registration />
      <RecordSubmission />
      <AuditTrail />
    </div>
  );
}

export default App;
