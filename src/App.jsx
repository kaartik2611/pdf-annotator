import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DocumentPage from "./components/Document";
import Home from "./pages/Home";
export default function App() {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    const url = localStorage.getItem("url");
    if (url && url !== "null") {
      setUrl(url);
    }
  }, []);
  useEffect(() => {
    console.log(url);
  }, [url]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home url={url} setUrl={setUrl} />} />
        <Route
          path="/document"
          element={<DocumentPage url={url} setUrl={setUrl} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
