import React from 'react';

const Button = ({ label, onClick, className = 'btn btn-primary', ...props }) => (
  <button className={className} onClick={onClick} {...props}>
    {label}
  </button>
);

export default Button;

