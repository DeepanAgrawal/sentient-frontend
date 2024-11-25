// src/components/controls/ParameterControl.tsx
import { ParameterControlProps } from "@sentient/types";
import React from "react";

const ParameterControl: React.FC<ParameterControlProps> = ({
  label,
  value,
  onChange,
}) => (
  <div className="mb-4 flex items-center">
    <span className="mr-4 w-32 text-gray-700">{label}</span>
    <input
      type="range"
      min="0"
      max="2"
      step="0.1"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full"
    />
    <span className="ml-2 text-gray-700">{value.toFixed(1)}</span>
  </div>
);

export default ParameterControl;
