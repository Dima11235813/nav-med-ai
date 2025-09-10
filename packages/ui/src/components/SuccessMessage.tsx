import React from 'react';

interface SuccessMessageProps {
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  return (
    <div className="bg-green-50 border border-green-200 rounded p-3">
      <p className="text-green-800">{message}</p>
    </div>
  );
};

export default SuccessMessage;
