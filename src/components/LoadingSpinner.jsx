import React from 'react';
import '../CssFolder/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>로딩 중...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;