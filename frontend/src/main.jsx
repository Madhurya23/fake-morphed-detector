import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";

import "./styles/index.css"; // ONLY ONE CSS ENTRY

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AppRoutes />
      <Toaster position="top-right" />
    </ThemeProvider>
  </StrictMode>
);
