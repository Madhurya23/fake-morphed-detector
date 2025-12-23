import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function useUpload() {
  const { setResultData } = useContext(AppContext);

  const uploadFile = (file) => {
    // Simulate API delay
    setTimeout(() => {
      // Dummy result data
      const dummyResult = {
        label: ["Real", "Fake", "Morphed"][Math.floor(Math.random() * 3)],
        confidence: Math.floor(Math.random() * 50) + 50, // 50-100%
        heatmap: "https://i.ibb.co/2n1P5B7/heatmap-sample.png",
        probabilities: [
          { name: "Real", value: Math.floor(Math.random() * 50) + 20 },
          { name: "Fake", value: Math.floor(Math.random() * 50) + 10 },
          { name: "Morphed", value: Math.floor(Math.random() * 50) + 10 },
        ],
      };
      setResultData(dummyResult);
    }, 1500);
  };

  return { uploadFile };
}
