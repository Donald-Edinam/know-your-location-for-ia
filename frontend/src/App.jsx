// src/App.js
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ExamForm from './components/ExamForm';
import ExamDetails from './components/ExamDetails';
import Footer from './components/Footer';

function App() {
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExamSchedule = async (studentId, course) => {
    setLoading(true);
    setError(null);
    setExamData(null);
    
    try {
      // API base URL - would come from environment variables in a real app
      const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      // Build URL with course query parameter if provided
      const url = course 
        ? `${API_URL}/exam/${studentId}?course=${course}`
        : `${API_URL}/exam/${studentId}`;
        
      const response = await fetch(url);
      
      if (!response.ok) {
        const data = await response.json();
        console.log("Error", error)
        throw new Error(data.error || 'Failed to fetch exam schedule');
      }
      
      const data = await response.json();
      setExamData(data);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching exam schedule');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="container">
        <ExamForm onSubmit={fetchExamSchedule} />
        
        {loading && <div className="loading">Loading...</div>}
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        
        {examData && !loading && !error && (
          <ExamDetails examData={examData} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;