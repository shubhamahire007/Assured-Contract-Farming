import { Link } from 'react-router-dom';

const Button = ({ to, children, onClick, disabled = false, variant = 'primary' }) => {

  const baseClasses = "inline-block px-4 py-2 rounded-md font-semibold text-sm text-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:cursor-pointer";
  
  const variants = {
    primary: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const disabledClasses = "disabled:bg-200 disabled:cursor-not-allowed";

  const className = `${baseClasses} ${variants[variant]} ${disabled ? disabledClasses : ''}`;

  // If a 'to' prop is provided, render a React Router Link styled as a button
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  // Otherwise, render a standard button
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;