// backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load exam data
const examData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'examData.json'), 'utf8'));

// API Endpoint to get exam schedule by student ID and optionally filtered by course
app.get('/api/exam/:id', (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const courseFilter = req.query.course;
    
    if (isNaN(studentId)) {
      return res.status(400).json({ error: 'Invalid student ID format' });
    }
    
    // Filter courses if course parameter is provided
    const coursesToCheck = courseFilter 
      ? [courseFilter]
      : Object.keys(examData);
    
    const results = [];
    
    // Check each course for matching exam schedules
    coursesToCheck.forEach(course => {
      if (!examData[course]) {
        return; // Skip if course doesn't exist
      }
      
      // Find matching schedule where student ID falls within index range
      const matchingSchedules = examData[course].filter(schedule => 
        studentId >= schedule.indexRange[0] && studentId <= schedule.indexRange[1]
      );
      
      results.push(...matchingSchedules);
    });
    
    if (results.length === 0) {
      return res.status(404).json({ 
        error: 'No exam schedule found for the provided student ID and course' 
      });
    }
    
    return res.json(results);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for testing
module.exports = app;