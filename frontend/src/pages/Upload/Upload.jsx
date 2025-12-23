import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Upload.css";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  /* ===== FILE HANDLERS ===== */
  const handleChange = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer?.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  /* ===== REMOVE IMAGE ===== */
  const removeImage = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* ===== PROCESS ===== */
  const handleProcess = () => {
  if (!file) {
    alert("Upload an image first!");
    return;
  }
  navigate("/result", {
    state: {
      image: preview,
    },
  });
};


  /* ===== UTIL ===== */
  const humanSize = (n) => {
    if (!n) return "";
    const kb = n / 1024;
    if (kb < 1024) return `${kb.toFixed(0)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        {/* ===== LEFT COLUMN ===== */}
        <div className="left-col">
          <h1 className="title">Upload Image Here</h1>

          <div
            className={`upload-area ${dragActive ? "dragover" : ""} ${
              preview ? "has-preview" : ""
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleChange}
            />

            {preview ? (
              <>
                <div className="preview-wrapper">
                  <img src={preview} alt="Preview" className="preview" />

                  <button
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // 🔥 important
                      removeImage();
                    }}
                    aria-label="Remove image"
                  >
                    ✕
                  </button>
                </div>

                <div className="file-meta">
                  <span>{file?.name}</span>
                  <span>{humanSize(file?.size)}</span>
                </div>
              </>
            ) : (
              <>
                <div className="upload-illustration" aria-hidden>
                  <svg
                    className="upload-icon"
                    width="72"
                    height="72"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 16V4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 9l5-5 5 5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 20H3"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p className="empty-title">
                  Drop an image here or click to select
                </p>
                <span className="upload-subtext">
                  PNG or JPG · Max 5 MB
                </span>
              </>
            )}
          </div>

          <button
            className="process-btn"
            onClick={handleProcess}
            disabled={!file}
          >
            Process Image
          </button>
        </div>

        {/* ===== RIGHT COLUMN ===== */}
        <aside className={`instructions ${showInstructions ? "visible" : ""}`}>
          <h3>Upload instructions</h3>

          <ul className="instr-list">
            <li>
              <strong>Frontal face:</strong> Clear, front-facing photo.
            </li>
            <li>
              <strong>No occlusions:</strong> Avoid hats, masks, sunglasses.
            </li>
            <li>
              <strong>Tight crop:</strong> Face should fill most of the frame.
            </li>
            <li>
              <strong>Formats:</strong> JPG or PNG (max 5 MB).
            </li>
          </ul>

          <div className="instr-footer">
            Tip: Natural lighting gives best results.
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Upload;
