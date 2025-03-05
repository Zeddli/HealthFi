// import logo from './logo.svg';
import './App.css';
import React from 'react';
import Registration from './components/Registration';
import RecordSubmission from './components/RecordSubmission';

function App() {
  return (
    <div className="App">
      <h1>DeHeal</h1>
      <Registration />
      <RecordSubmission />
    </div>
  );
}

export default App;
