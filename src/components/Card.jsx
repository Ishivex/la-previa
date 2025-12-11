import React from 'react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-gray-900/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl ${className}`}>
    {children}
  </div>
);

export default Card;
