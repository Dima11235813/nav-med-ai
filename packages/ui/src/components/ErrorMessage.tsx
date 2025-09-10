import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded p-3">
      <p className="text-red-800">{message}</p>
    </div>
  );
};

export default ErrorMessage;
