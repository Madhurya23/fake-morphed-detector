import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
  const location = useLocation();

  const { result, image } = location.state || {};

  // -------------------------
  // REDIRECT IF NO DATA
  // -------------------------
  useEffect(() => {

    if (!result || !image) {
      navigate("/upload");
    }

  }, [result, image, navigate]);

  if (!result || !image) return null;

  // -------------------------
  // NORMALIZE SCORES
  // -------------------------
  const normalize = (data) => {

    const total =
      data.real +
      data.ai +
      data.morphed || 1;

    return {

      real:
        (data.real / total) * 100,

      ai:
        (data.ai / total) * 100,

      morphed:
        (data.morphed / total) * 100
    };
  };

  const normalizedResult = normalize(result);

  // -------------------------
  // FINAL LABEL
  // -------------------------
  const getLabel = () => {

    if (result.finalLabel === "real") {
      return "REAL IMAGE";
    }

    if (result.finalLabel === "ai") {
      return "AI GENERATED";
    }

    if (result.finalLabel === "morphed") {
      return "MORPHED IMAGE";
    }

    return "UNCERTAIN";
  };

  const label = getLabel();

  return (

    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      <main className="flex-1 flex flex-col items-center justify-center py-8 px-4">

        <Container className="w-full max-w-6xl">

          <div className="grid md:grid-cols-2 gap-6">

            {/* IMAGE */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">

              <h2 className="text-xl font-semibold text-center mb-4">
                Uploaded Image
              </h2>

              <img
                src={image}
                alt="uploaded"
                className="w-full max-h-[400px] object-contain rounded"
              />

            </div>

            {/* RESULT PANEL */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-5">

              <h2 className="text-2xl font-bold text-center">
                Detection Result
              </h2>

              {/* FINAL RESULT */}
              <RiskBadge
                label={label}
                type={result.finalLabel}
              />

              {/* CONFIDENCE */}
              <div className="text-center">

                <p className="text-lg font-medium">
                  Confidence:{" "}

                  <span className="font-bold">
                    {result.confidence}%
                  </span>

                </p>

              </div>

              {/* CONFIDENCE BARS */}
              <ConfidenceBar
                label="Real"
                value={normalizedResult.real}
              />

              <ConfidenceBar
                label="AI Generated"
                value={normalizedResult.ai}
              />

              <ConfidenceBar
                label="Morphed"
                value={normalizedResult.morphed}
              />

              {/* DOWNLOAD REPORT */}
              <DownloadReport
                image={image}
                prediction={result}
              />

              <HowItWorks />

              <AnalysisSteps />

              <Disclaimer />

              {/* BUTTON */}
              <Button
                onClick={() => navigate("/upload")}
                className="w-full"
              >
                Analyze Another Image
              </Button>

            </div>

          </div>

        </Container>

      </main>

      <Footer />

    </div>
  );
}