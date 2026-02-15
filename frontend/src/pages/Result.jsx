import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "../components/Button";
import Container from "../components/Container";
import ConfidenceBar from "../components/ConfidenceBar";
import RiskBadge from "../components/RiskBadge";
import AnalysisSteps from "../components/AnalysisSteps";
import Disclaimer from "../components/Disclaimer";
import Footer from "../components/Footer";
import DownloadReport from "../components/DownloadReport";
import HowItWorks from "../components/HowItWorks";

export default function Result() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const img = localStorage.getItem("uploadedImage");
    if (!img) return navigate("/upload");
    setImage(img);

    // Demo deterministic logic
    const hash = img.length % 100;
    const real = Math.max(5, 100 - hash);
    const fake = Math.min(70, Math.floor(hash * 0.6));
    const morphed = Math.max(3, 100 - real - fake);
    let finalLabel = "Real";
    if (fake > real) finalLabel = "Fake";
    if (morphed > real) finalLabel = "Morphed";
    setPrediction({ real, fake, morphed, finalLabel });
  }, [navigate]);

  if (!image || !prediction) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="flex-1 flex flex-col items-center justify-center py-8 sm:py-12 px-4 w-full">
        <Container className="w-full max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col items-center justify-center"
            >
              <h2 className="text-xl font-semibold mb-4 text-center">
                Uploaded Image
              </h2>
              <motion.img
                src={image}
                alt="Uploaded"
                className="w-full max-h-[400px] object-contain rounded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </motion.div>

            {/* RESULT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow flex flex-col justify-start space-y-6"
            >
              <h2 className="text-2xl font-bold text-center mb-2">
                Prediction Result
              </h2>

              <div className="flex justify-center mb-4">
                <RiskBadge label={prediction.finalLabel} />
              </div>

              <div className="space-y-3">
                <ConfidenceBar label="Real" value={prediction.real} color="bg-green-500" />
                <ConfidenceBar label="Fake" value={prediction.fake} color="bg-red-500" />
                <ConfidenceBar label="Morphed" value={prediction.morphed} color="bg-yellow-400" />
              </div>

              <DownloadReport image={image} prediction={prediction} />
              <HowItWorks />
              <AnalysisSteps />
              <Disclaimer />

              <Button
                onClick={() => navigate("/upload")}
                className="w-full mt-4 hover:scale-105 transition-transform duration-200"
              >
                Analyze Another Image
              </Button>
            </motion.div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
