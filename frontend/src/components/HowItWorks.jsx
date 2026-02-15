// src/components/HowItWorks.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline mb-2"
      >
        {open ? "Hide How It Works" : "How It Works"}
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-gray-700 dark:text-gray-200 text-sm"
        >
          <ul className="list-disc pl-5 space-y-1">
            <li>Upload an image of a face.</li>
            <li>The AI detects whether it's Real, Fake, or Morphed.</li>
            <li>Confidence scores are shown with gradient bars.</li>
            <li>Visual analysis highlights suspicious areas of the image.</li>
          </ul>
        </motion.div>
      )}
    </div>
  );
}
