import './App.css'

import { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState({ columns: [], rows: [] });

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert(error.message)
    }
  };

  return (
    <div>
      <h1>CSV File Upload System</h1>
      <input type="file" onChange={handleFileUpload}/>
      <button onClick={handleSubmit}>Upload</button>

      {data.columns.length > 0 && (
        <>
          <h1>Reading data from {data.filename}</h1>
          <table border="1">
            <thead>
              <tr>
                {data.columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, idx) => (
                <tr key={idx}>
                  {data.columns.map((col) => (
                    <td key={col}>{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default App;

