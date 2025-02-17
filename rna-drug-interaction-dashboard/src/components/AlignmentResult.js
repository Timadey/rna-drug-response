import React from 'react';
import './AlignmentResult.css';

function AlignmentResult({ results }) {
  const { alignments } = results;

  return (
    <div className="results-container">
      <h2>Alignment Results</h2>
      <div className="alignments">
        {alignments.map((alignment, index) => (
          <pre key={index} className="alignment">
            {alignment}
          </pre>
        ))}
      </div>
    </div>
  );
}

export default AlignmentResult;