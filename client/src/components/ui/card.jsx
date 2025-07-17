// src/components/ui/card.jsx
import React from 'react';

export const Card = ({ children, className = '', ...props }) => (
  <div className={`rounded-xl border bg-white p-4 shadow ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`border-b mb-2 pb-2 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-xl font-semibold ${className}`} {...props}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = '', ...props }) => (
  <div className={`text-sm ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`border-t mt-2 pt-2 ${className}`} {...props}>
    {children}
  </div>
);
