"use client";
import React from "react";

interface Props {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}

const CheckboxField: React.FC<Props> = ({ label, checked, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </div>
  );
};

export default CheckboxField;