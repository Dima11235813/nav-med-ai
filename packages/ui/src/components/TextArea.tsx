import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea: React.FC<TextAreaProps> = (props) => {
  return <textarea className="border rounded px-3 py-2" {...props} />;
};

export default TextArea;
