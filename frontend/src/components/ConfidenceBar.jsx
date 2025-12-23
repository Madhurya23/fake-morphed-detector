// src/components/ConfidenceBar.jsx
import React from "react";
import { motion } from "framer-motion";

export default function ConfidenceBar({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-medium">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className={`h-4 rounded-full ${color} bg-gradient-to-r from-indigo-400 to-indigo-600`}
        />
      </div>
    </div>
  );
}
