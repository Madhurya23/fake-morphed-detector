import React from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

export default function Contact() {
  const contacts = [
    { type: "Email", value: "support@example.com", link: "mailto:support@example.com" },
    { type: "GitHub", value: "Madhurya23/fake-morphed-detector", link: "https://github.com/Madhurya23/fake-morphed-detector" },
    { type: "LinkedIn", value: "diyaa544", link: "https://linkedin.com/in/diyaa544" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="flex-1 max-w-5xl mx-auto px-4 py-20 sm:py-24 flex flex-col items-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 text-center text-indigo-700 dark:text-indigo-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact & Info
        </motion.h1>

        <motion.p
          className="text-center text-gray-700 dark:text-gray-200 mb-12 max-w-3xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Thank you for visiting the Fake & Morphed Image Detection System. 
          This project is purely academic and demonstrates AI-powered image analysis 
          for detecting deepfakes, morphed, or altered images.
        </motion.p>

        <div className="grid sm:grid-cols-3 gap-8 w-full">
          {contacts.map((c, i) => (
            <motion.div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow flex flex-col items-center text-center hover:scale-105 transition-transform duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.2, duration: 0.8 }}
            >
              <h3 className="text-lg font-semibold mb-2">{c.type}</h3>
              <a 
                href={c.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline break-words"
              >
                {c.value}
              </a>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
