import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: string; 
}

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button {...rest}>
      {children}
    </button>
  );
};

export default Button;
