import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Results from './components/Results';
import './App.css';

function App() {
  const [results, setResults] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>RNA-Drug Interaction</h1>
        <FileUpload setResults={setResults} />
        {results && <Results results={results} />}
      </header>
    </div>
  );
}

export default App;