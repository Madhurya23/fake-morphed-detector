// src/components/RiskBadge.jsx
import React from "react";

export default function RiskBadge({ label }) {
  const colors = {
    Real: "bg-green-500",
    Fake: "bg-red-500",
    Morphed: "bg-yellow-400",
  };
  return (
    <span
      className={`px-4 py-2 font-semibold text-white rounded-full ${colors[label]} transition-transform transform hover:scale-105 hover:shadow-lg`}
    >
      {label}
    </span>
  );
}
