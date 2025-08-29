import React from 'react';
import './Button.css'; // We will create this file for styling

const Button = ({ children, onClick, disabled = false, variant = 'primary' }) => {
  // `children` is the text inside the button
  // `onClick` is the function to call when clicked
  // `disabled` handles the disabled state
  // `variant` allows for different styles (e.g., primary, danger)

  const className = `custom-button ${variant}`;

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;