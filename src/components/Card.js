import React from 'react';

// A simple, reusable card component
const Card = ({ className, children }) => {
  return (
    <div className={`card ${className}`}>
      <div className="card-placeholder">
        {children}
      </div>
    </div>
  );
};

export default Card;