import React from "react";
import { useNavigate } from "react-router";

function Home({ setUrl }) {
  const navigate = useNavigate();
  const updateUrl = (url) => {
    setUrl(url);
    localStorage.setItem("url", url);
    navigate("/document");
  };
  return (
    <div className="p-10">
      <h1 className="text-3xl underline underline-offset-2 pb-4">Documents</h1>
      <div className="flex flex-col text-lg">
        <button
          onClick={() => {
            updateUrl("https://arxiv.org/pdf/2212.08011.pdf");
          }}
          className="w-60 border-2 border-neutral-400 my-2 rounded-md hover:bg-neutral-400 text-neutral-800"
        >
          Sample Document 1.pdf
        </button>
        <button
          onClick={() => {
            updateUrl("https://arxiv.org/pdf/2212.07937.pdf");
          }}
          className="w-60 border-2 border-neutral-400 my-2 rounded-md hover:bg-neutral-400 text-neutral-800"
          >
          Sample Document 2.pdf
        </button>
        <button
          onClick={() => {
            updateUrl("https://arxiv.org/pdf/2212.07931.pdf");
          }}
          className="w-60 border-2 border-neutral-400 my-2 rounded-md hover:bg-neutral-400 text-neutral-800"
        >
          Sample Document 3.pdf
        </button>
      </div>
    </div>
  );
}

export default Home;
