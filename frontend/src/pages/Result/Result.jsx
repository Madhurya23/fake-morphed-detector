import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const image = location.state?.image;

  const real = Math.floor(Math.random() * 101);
  const fake = Math.floor(Math.random() * (101 - real));
  const morphed = 100 - real - fake;

  let result = "REAL";
  let color = "green";

  if (fake > real || morphed > real) {
    result = "FAKE";
    color = "red";
  }

  if (!image) {
    return (
      <div className="result-container">
        <h2>No image found</h2>
        <button onClick={() => navigate("/")}>
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="result-container">
      <h1 className="result-title">Detection Result</h1>

      <div className="result-content">
        <div className="image-box">
          <img src={image} alt="Uploaded" />
        </div>

        <div className="analysis-box">
          <div className="row">
            <span>Real</span>
            <div className="bar">
              <div style={{ width: real + "%" }}></div>
            </div>
            <span>{real}%</span>
          </div>

          <div className="row">
            <span>Fake</span>
            <div className="bar">
              <div style={{ width: fake + "%" }}></div>
            </div>
            <span>{fake}%</span>
          </div>

          <div className="row">
            <span>Morphed</span>
            <div className="bar">
              <div style={{ width: morphed + "%" }}></div>
            </div>
            <span>{morphed}%</span>
          </div>

          <h2 style={{ color }}>
            Overall Result: {result}
          </h2>

          <button
            className="retry-btn"
            onClick={() => navigate("/")}
          >
            Try another image
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
