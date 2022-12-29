import React from "react";

function Home() {
  return (
    <div className="p-10">
      <h1 className="text-3xl underline underline-offset-2 pb-4">Documents</h1>
      <div className="flex flex-col text-lg">
        <a
          href={`/document?url=${encodeURIComponent(
            "https://arxiv.org/pdf/2212.08011.pdf"
          )}`}
          className="w-60 border-2 my-2 rounded-md"
        >
          Sample Document 1.pdf
        </a>
        <a
          className="w-60 border-2 my-2 rounded-md"
          href={`/document?url=${encodeURIComponent(
            "https://arxiv.org/pdf/2212.07937.pdf"
          )}`}
        >
          Sample Document 2.pdf
        </a>
        <a
          className="w-60 border-2 my-2 rounded-md"
          href={`/document?url=${encodeURIComponent(
            "https://arxiv.org/pdf/2212.07931.pdf"
          )}`}
        >
          Sample Document 3.pdf
        </a>
      </div>
    </div>
  );
}

export default Home;
