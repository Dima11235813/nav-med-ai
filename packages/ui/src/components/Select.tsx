import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select: React.FC<SelectProps> = (props) => {
  return <select className="border rounded px-3 py-2" {...props} />;
};

export default Select;
