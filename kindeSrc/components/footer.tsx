import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="terms">
        <a href="#" aria-label="Terms">
          Terms
        </a>
        <a href="#" aria-label="Privacy">
          Privacy
        </a>
      </div>
      <small style={{ color: '#ababab' }}>Powered by Kinde</small>
    </footer>
  );
};
