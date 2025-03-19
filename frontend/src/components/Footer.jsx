// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} College of Education, UG - Exam Schedule System</p>
      </div>
    </footer>
  );
};

export default Footer;