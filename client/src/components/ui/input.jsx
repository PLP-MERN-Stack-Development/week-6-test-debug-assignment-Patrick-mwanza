// client/src/components/ui/input.jsx
import React from "react";

export const Input = ({ type = "text", value, onChange, placeholder, ...props }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      {...props}
    />
  );
};
