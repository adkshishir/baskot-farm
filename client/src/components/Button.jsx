import React from "react";

const Button = ({ onClick, value, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 hover:bg-blue-700 bg-blue-500 text-white rounded-lg hover:border-2 focus:border-blue-900 ${className}`}
    >
      {value}
    </button>
  );
};

export default Button;
