"use client";
import React from "react";

interface Props {
  label: string;
  value: number | string;
  onChange: (val: string) => void; // keep as string from input, parse later
  step?: string;
  min?: number;
  max?: number;
  required?: boolean;
}

const NumberField: React.FC<Props> = ({ label, value, onChange, step = "1", min, max, required }) => {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        required={required}
        className="border rounded w-full p-2"
      />
    </div>
  );
};

export default NumberField;