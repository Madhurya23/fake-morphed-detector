// src/components/DownloadReport.jsx
import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Button from "./Button";

export default function DownloadReport({ image, prediction }) {
  const handleDownload = async () => {
    // Create a container div with styled content
    const container = document.createElement("div");
    container.style.width = "800px";
    container.style.padding = "20px";
    container.style.background = "white";
    container.style.color = "#111";
    container.style.fontFamily = "Arial, sans-serif";
    container.style.borderRadius = "10px";
    container.innerHTML = `
      <h1 style="text-align:center;color:#4F46E5;">Fake & Morphed Image Detection Report</h1>
      <hr style="margin:10px 0;" />
      <h2>Prediction:</h2>
      <p><strong>${prediction.finalLabel}</strong></p>
      <h2>Confidence:</h2>
      <ul>
        <li>Real: ${prediction.real}%</li>
        <li>Fake: ${prediction.fake}%</li>
        <li>Morphed: ${prediction.morphed}%</li>
      </ul>
      <h2>Uploaded Image:</h2>
      <img src="${image}" style="max-width:100%;border-radius:8px;border:1px solid #ccc;" />
      <hr style="margin:20px 0;" />
      <p style="font-size:12px;color:#555;text-align:center;">
        © 2025 Fake & Morphed Image Detection System · Academic Project
      </p>
    `;

    // Temporarily append to body to render HTML
    document.body.appendChild(container);

    // Convert HTML content to canvas
    const canvas = await html2canvas(container, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Generate PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("ImageAnalysisReport.pdf");

    // Remove the temporary container
    document.body.removeChild(container);
  };

  return (
    <Button
      onClick={handleDownload}
      className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
    >
      Download PDF Report
    </Button>
  );
}
