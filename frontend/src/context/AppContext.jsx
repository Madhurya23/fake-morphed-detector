import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [resultData, setResultData] = useState(null);

  return (
    <AppContext.Provider value={{ uploadedFile, setUploadedFile, resultData, setResultData }}>
      {children}
    </AppContext.Provider>
  );
};
