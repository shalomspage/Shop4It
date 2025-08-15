"use client";
import React from "react";
import { Option } from "../types";

interface Props<T extends string | number = string | number> {
  label: string;
  value: T | "";
  onChange: (val: T | "") => void;
  options: Option<T>[];
  placeholder?: string;
  required?: boolean;
}

function SelectField<T extends string | number = string | number>({
  label,
  value,
  onChange,
  options,
  placeholder = "Select",
  required,
}: Props<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    if (v === "") {
      onChange("");
      return;
    }
    // Convert string back to number if T is number
    if (typeof value === "number") {
      onChange(Number(v) as T);
    } else {
      onChange(v as T);
    }
  };

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <select
        value={value === "" ? "" : String(value)} // convert value to string for HTML
        onChange={handleChange}
        required={required}
        className="border rounded w-full p-2"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={`${opt.label}-${opt.value}`} value={String(opt.value)}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
