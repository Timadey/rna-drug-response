import React, { useState } from 'react';
import axios from 'axios';
import './AlignmentForm.css';

function AlignmentForm({ setResults }) {
  const [sequence1, setSequence1] = useState('');
  const [sequence2, setSequence2] = useState('');
  const [alignmentType, setAlignmentType] = useState('global');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const response = await axios.post('https://potential-barnacle-p97q44vjq9526j6p-8000.app.github.dev/align', {
        sequence1,
        sequence2,
        alignment_type: alignmentType,
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching alignment", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="alignment-form">
      <textarea
        value={sequence1}
        onChange={(e) => setSequence1(e.target.value)}
        placeholder="Enter first sequence"
        required
      />
      <textarea
        value={sequence2}
        onChange={(e) => setSequence2(e.target.value)}
        placeholder="Enter second sequence"
        required
      />
      <select value={alignmentType} onChange={(e) => setAlignmentType(e.target.value)}>
        <option value="global">Global (Needleman-Wunsch)</option>
        <option value="local">Local (Smith-Waterman)</option>
      </select>
      <button type="submit" disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Align Sequences'}
      </button>
    </form>
  );
}

export default AlignmentForm;