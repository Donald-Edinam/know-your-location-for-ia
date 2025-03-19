// src/components/ExamDetails.js
import React from 'react';

const ExamDetails = ({ examData }) => {
  // Helper to format date for display
  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return `${day} March, ${year}`;
  };

  return (
    <div className="exam-details">
      <h3>Your Exam Schedule</h3>
      
      {examData.length === 0 ? (
        <p>No exam schedule found for your student ID and selected course.</p>
      ) : (
        examData.map((exam, index) => (
          <div key={index} className="exam-card">
            <h4>{exam.course} - {exam.paperTitle}</h4>
            
            <div className="exam-info">
              <div className="info-row">
                <span className="label">Date:</span>
                <span className="value">{formatDate(exam.examDate)}</span>
              </div>
              
              <div className="info-row">
                <span className="label">Time:</span>
                <span className="value">{exam.time}</span>
              </div>
              
              <div className="info-row">
                <span className="label">Centre:</span>
                <span className="value">{exam.centre}</span>
              </div>
              
              <div className="info-row">
                <span className="label">Exam Hall:</span>
                <span className="value">{exam.examHall}</span>
              </div>
              
              <div className="info-row">
                <span className="label">Batch:</span>
                <span className="value">{exam.batch}</span>
              </div>
              
              <div className="info-row">
                <span className="label">Index Range:</span>
                <span className="value">{exam.indexRange[0]} - {exam.indexRange[1]}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ExamDetails;
