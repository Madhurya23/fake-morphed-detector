import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    ["Secure Media", "Prevent misinformation at scale."],
    ["AI Analysis", "Deep learning powered classification."],
    ["Visual Trust", "Grad-CAM heatmaps & confidence scores."],
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      {/* MAIN CONTENT — fills space between navbar + footer */}
      <main className="flex-1 flex">
        <div
          className="
            max-w-6xl mx-auto px-6 
            w-full 
            min-h-[calc(100vh-140px)]
            flex flex-col justify-center
          "
        >
          {/* HERO SECTION */}
          <section className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-snug gradient-text"
              style={{ lineHeight: "1.3" }}
            >
              Fake / Morphed Image Detector
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base md:text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto mb-6 leading-relaxed"
            >
              Detect deepfakes, morphed, or altered images instantly with
              AI-powered analysis and visual explanations.
            </motion.p>

            <Button className="px-8 py-3" onClick={() => navigate("/upload")}>
              Upload Image
            </Button>
          </section>

          {/* FEATURES GRID */}
          <section className="grid md:grid-cols-3 gap-6">
            {features.map(([title, desc], i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card className="p-6 h-full flex flex-col justify-between dark:bg-gray-800">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 dark:text-gray-100">
                      {title}
                    </h3>
                    <p className="text-sm md:text-base leading-snug text-gray-600 dark:text-gray-200">
                      {desc}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
