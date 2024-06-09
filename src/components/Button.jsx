import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Button.css';

const Button = ({ children, type, onClick, buttonStyle, buttonSize, href, formAction, to }) => {
  const checkButtonStyle = buttonStyle || 'btn--primary';
  const checkButtonSize = buttonSize || 'btn--medium';

  if (href) {
    return (
      <a href={href} className={`btn ${checkButtonStyle} ${checkButtonSize}`}>
        {children}
      </a>
    );
  } else if (formAction) {
    const handleClick = (e) => {
      e.preventDefault();
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={handleClick} type={type} form={formAction}>
        {children}
      </button>
    );
  } else {
    return (
      <Link to={to} className={`btn ${checkButtonStyle} ${checkButtonSize}`}>
        {children}
      </Link>
    );
  }
};

export default Button;