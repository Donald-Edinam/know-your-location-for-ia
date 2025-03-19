
// src/components/ExamForm.js
import React, { useState } from 'react';

const ExamForm = ({ onSubmit }) => {
  const [studentId, setStudentId] = useState('');
  const [course, setCourse] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    } else if (!/^\d+$/.test(studentId.trim())) {
      newErrors.studentId = 'Student ID must contain only numbers';
    }
    
    if (!course) {
      newErrors.course = 'Please select a course';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(studentId.trim(), course);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="studentId">Student ID:</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter your student ID"
            className={errors.studentId ? 'error' : ''}
          />
          {errors.studentId && <div className="error-text">{errors.studentId}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="course">Course:</label>
          <select
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className={errors.course ? 'error' : ''}
          >
            <option value="">Select a course</option>
            <option value="TESS101">TESS101 - Foundations of Education</option>
            <option value="TESS103">TESS103 - Psychology of Learning</option>
          </select>
          {errors.course && <div className="error-text">{errors.course}</div>}
        </div>

        <button type="submit" className="submit-btn">Find My Exam Schedule</button>
      </form>
    </div>
  );
};

export default ExamForm;