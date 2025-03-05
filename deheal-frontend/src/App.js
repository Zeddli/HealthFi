// import logo from './logo.svg';
import './App.css';
import React from 'react';
import Registration from './components/Registration';
import RecordSubmission from './components/RecordSubmission';
import AuditTrail from './components/AuditTrail';
import DeployedRecords from './components/DeployedRecords';

function App() {
  return (
    <div className="App">
      <h1>DeFi Health Data</h1>
      <Registration />
      <RecordSubmission />
      <AuditTrail />
      <DeployedRecords />
    </div>
  );
}

export default App;
