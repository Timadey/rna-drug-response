import React from 'react';
import './Results.css';

function Results({ results }) {
  const { markers_found, rna_seq } = results;

  return (
    <div className="results-container">
      <h2>Interaction Results</h2>
      <ul>
        {Object.entries(markers_found).map(([marker, disease], index) => (
          <li key={index}>
            <strong>Marker:</strong> {marker} <br />
            <strong>Disease:</strong> {disease}
          </li>
        ))}
      </ul>
      <h2>RNA Sequence</h2>
      <div className="rna-sequence">
        {rna_seq.split('').map((char, index) => (
          <span key={index} className={markers_found[char] ? 'highlight' : ''}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Results;