import React from 'react';
import './AlignmentResult.css';

function AlignmentResult({ results }) {
  const { alignments } = results;

  const parseAlignment = (alignment) => {
    const lines = alignment.split('\n');
    const seq1 = lines[0];
    const match = lines[1];
    const seq2 = lines[2];
    const score = lines[3];

    return { seq1, match, seq2, score };
  };

  const visualizeAlignment = ({ seq1, match, seq2 }) => {
    const seq1Components = seq1.split('').map((char, index) => (
      <span key={index} className={`char ${char.toLowerCase()}`}>
        {char}
      </span>
    ));

    const matchComponents = match.split('').map((char, index) => (
      <span key={index} className={`char ${char === '|' ? 'match' : char === ' ' ? 'mismatch' : 'gap'}`}>
        {char === '|' ? '↓' : char}
      </span>
    ));

    const seq2Components = seq2.split('').map((char, index) => (
      <span key={index} className={`char ${char.toLowerCase()}`}>
        {char}
      </span>
    ));

    return (
      <div className="alignment">
        <div className="sequence">{seq1Components}</div>
        <div className="match-line">{matchComponents}</div>
        <div className="sequence">{seq2Components}</div>
      </div>
    );
  };

  return (
    <div className="results-container">
      <h2>Alignment Results</h2>
      <div className="alignments">
        {alignments.map((alignment, index) => {
          const parsedAlignment = parseAlignment(alignment);
          return (
            <div key={index} className="alignment-container">
              {visualizeAlignment(parsedAlignment)}
              <div className="score">{parsedAlignment.score}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AlignmentResult;