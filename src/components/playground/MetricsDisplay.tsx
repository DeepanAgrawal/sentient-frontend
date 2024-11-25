// src/components/playground/MetricsDisplay.tsx
import { MetricsProps } from "@sentient/types";
import React from "react";

const MetricsDisplay: React.FC<MetricsProps> = ({
  tokensPerSecond,
  totalTokens,
}) => (
  <div className="mt-4 text-gray-700">
    <p>Tokens per second: {tokensPerSecond}</p>
    <p>Total tokens: {totalTokens}</p>
  </div>
);

export default MetricsDisplay;
