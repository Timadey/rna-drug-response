import React, { useState } from 'react';
import AlignmentForm from './components/AlignmentForm';
import AlignmentResult from './components/AlignmentResult';
import './App.css';

function App() {
  const [results, setResults] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sequence Alignment Tool</h1>
        <AlignmentForm setResults={setResults} />
        {results && <AlignmentResult results={results} />}
      </header>
    </div>
  );
}

export default App;