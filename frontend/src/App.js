import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./Pages/Upload";
import Result from "./Pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


