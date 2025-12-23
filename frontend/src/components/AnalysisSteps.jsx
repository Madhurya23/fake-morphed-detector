// src/components/AnalysisSteps.jsx
import React from "react";

export default function AnalysisSteps({ className }) {
  return (
    <div className={`bg-gray-100 dark:bg-gray-800 rounded-lg p-4 ${className}`}>
      <h3 className="font-semibold mb-2">Analysis Steps:</h3>
      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-200">
        <li>Image preprocessing and face detection.</li>
        <li>Feature extraction using AI model.</li>
        <li>Confidence scoring for Real, Fake, Morphed.</li>
        <li>Visual highlighting of suspicious areas.</li>
      </ol>
    </div>
  );
}
