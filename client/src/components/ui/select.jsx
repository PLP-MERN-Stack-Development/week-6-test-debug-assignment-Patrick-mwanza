// client/src/components/ui/select.jsx
import React from "react";

export function Select({ value, onChange, children, ...props }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    >
      {children}
    </select>
  );
}

export const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

export const SelectContent = ({ children }) => <>{children}</>;
export const SelectGroup = ({ children }) => <>{children}</>;
export const SelectTrigger = ({ children }) => <>{children}</>;
export const SelectValue = ({ children }) => <>{children}</>;
