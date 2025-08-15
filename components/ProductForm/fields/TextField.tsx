"use client";
import React from "react";

interface Props {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

const TextField: React.FC<Props> = ({ label, value, onChange, placeholder, required, multiline, rows = 4 }) => {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className="border rounded w-full p-2"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="border rounded w-full p-2"
        />
      )}
    </div>
  );
};

export default TextField;