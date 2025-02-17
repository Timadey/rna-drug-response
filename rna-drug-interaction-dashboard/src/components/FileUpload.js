import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './FileUpload.css';

function FileUpload({ setResults }) {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.txt,.fasta' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://potential-barnacle-p97q44vjq9526j6p-8000.app.github.dev/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error uploading file", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="file-upload">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag & drop a file here, or click to select a file</p>
      </div>
      {file && <p>Selected file: {file.name}</p>}
      <button onClick={handleSubmit} disabled={!file || isProcessing}>
        {isProcessing ? 'Processing...' : 'Upload'}
      </button>
    </div>
  );
}

export default FileUpload;