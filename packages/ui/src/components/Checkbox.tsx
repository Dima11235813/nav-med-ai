import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <input type="checkbox" className="rounded" {...props} />;
};

export default Checkbox;
