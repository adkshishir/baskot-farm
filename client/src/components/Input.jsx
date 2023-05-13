import React from "react";

const Input = ({ type, placeholder, onChange, value, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder && placeholder}
      onChange={onChange}
      value={value}
      className={`px-4 py-2 m-4 rounded-lg border-2 text-lg focus:font-semibold text-blue-900  ${className}`}
    />
  );
};

export default Input;
