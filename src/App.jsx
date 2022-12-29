import { BrowserRouter, Route, Routes } from "react-router-dom";
import DocumentPage from "./components/Document";
import Home from "./pages/Home";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/document" element={<DocumentPage />} />
      </Routes>
    </BrowserRouter>
  );
}
