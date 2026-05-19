import React from "react";

import { jsPDF } from "jspdf";

import html2canvas from "html2canvas";

import Button from "./Button";

export default function DownloadReport({

  image,

  prediction

}) {

  const handleDownload = async () => {

    const heatmapUrl =
      prediction.heatmap || null;

    console.log(heatmapUrl);

    // -------------------------
    // CREATE CONTAINER
    // -------------------------
    const container =
      document.createElement("div");

    container.style.width = "800px";

    container.style.padding = "20px";

    container.style.background = "white";

    container.style.color = "#111";

    container.style.fontFamily = "Arial";

    container.style.borderRadius = "12px";

    container.style.position = "absolute";

    container.style.left = "-9999px";

    container.innerHTML = `

      <h1 style="
        text-align:center;
        color:#4F46E5;
      ">
        Fake & Morphed Image Detection Report
      </h1>

      <hr />

      <h2>Final Prediction</h2>

      <p>
        <strong>
          ${prediction.finalLabel.toUpperCase()}
        </strong>
      </p>

      <h2>Confidence Scores</h2>

      <ul>

        <li>
          Real:
          ${prediction.real}%
        </li>

        <li>
          AI:
          ${prediction.ai}%
        </li>

        <li>
          Morphed:
          ${prediction.morphed}%
        </li>

      </ul>

      <h2>Uploaded Image</h2>

      <img
        src="${image}"
        crossorigin="anonymous"
        style="
          width:100%;
          height:350px;
          object-fit:contain;
          border-radius:10px;
          border:1px solid #ccc;
          margin-top:10px;
        "
      />

      ${
        heatmapUrl
          ? `
            <h2 style="
              margin-top:25px;
            ">
              AI Detection Heatmap
            </h2>

            <img
              src="${heatmapUrl}"
              crossorigin="anonymous"
              style="
                width:100%;
                height:350px;
                object-fit:contain;
                border-radius:10px;
                border:1px solid #ccc;
                margin-top:10px;
              "
            />
          `
          : ""
      }

      <hr style="margin-top:20px;" />

      <p style="
        text-align:center;
        color:#666;
        font-size:12px;
      ">
        © 2026 Fake & Morphed Image Detection System
      </p>
    `;

    // -------------------------
    // APPEND CONTAINER
    // -------------------------
    document.body.appendChild(
      container
    );

    // -------------------------
    // WAIT FOR IMAGES
    // -------------------------
    const images =
      container.querySelectorAll("img");

    await Promise.all(

      Array.from(images).map((img) => {

        return new Promise((resolve) => {

          if (img.complete) {

            resolve();

          } else {

            img.onload = resolve;

            img.onerror = resolve;

          }

        });

      })

    );

    // -------------------------
    // HTML TO CANVAS
    // -------------------------
    const canvas =
      await html2canvas(container, {

        scale: 2,

        useCORS: true

      });

    const imgData =
      canvas.toDataURL("image/png");

    // -------------------------
    // PDF
    // -------------------------
    const pdf =
      new jsPDF(
        "p",
        "mm",
        "a4"
      );

    const pdfWidth =
      pdf.internal
        .pageSize
        .getWidth();

    const pdfHeight =
      (canvas.height * pdfWidth)
      / canvas.width;

    pdf.addImage(

      imgData,

      "PNG",

      0,

      0,

      pdfWidth,

      pdfHeight

    );

    pdf.save(
      "ImageAnalysisReport.pdf"
    );

    // -------------------------
    // REMOVE CONTAINER
    // -------------------------
    document.body.removeChild(
      container
    );
  };

  return (

    <Button

      onClick={handleDownload}

      className="
        w-full
        mt-4
        bg-indigo-600
        hover:bg-indigo-700
        text-white
      "
    >

      Download PDF Report

    </Button>

  );
}