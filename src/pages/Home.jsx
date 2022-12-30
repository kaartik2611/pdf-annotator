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
    <div className="bg-neutral-200 w-full h-screen">
      <div className="w-full max-w-2xl p-4 bg-neutral-300 mx-auto">
        <nav className="flex justify-between">
          <div className="m-2">
            <h1 className="text-2xl text-neutral-800 font-medium">
              PDF Annotator
            </h1>
          </div>
          <div className="my-auto">
            <a href="https://github.com/kaartik2611/classforma-test" target='_blank'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
              >
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 01-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 010 8c0-4.42 3.58-8 8-8z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </div>
      <div className="p-10">
        <h1 className="text-3xl underline underline-offset-2 pb-4">
          Documents
        </h1>
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
    </div>
  );
}

export default Home;
