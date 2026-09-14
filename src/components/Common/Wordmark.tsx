import React from 'react';

interface WordmarkProps {
  className?: string;
}

export const Wordmark: React.FC<WordmarkProps> = ({ className = '' }) => {
  return (
    <div className={`wordmark ${className}`}>
      <i aria-hidden="true"></i> Fieldwork
    </div>
  );
};
