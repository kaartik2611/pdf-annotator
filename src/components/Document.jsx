import React, { useEffect, useRef, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Document, Page } from "react-pdf/dist/esm/entry.vite";
function DocumentPage() {
  const [url, setUrl] = useState(null);
  const canvasRef = useRef(null);
  const [numPages, setNumPages] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [label, setLabel] = useState(null);

  const [boxes, setBoxes] = useState([]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    // load true only after 20secs
    setTimeout(() => {
      setLoaded(true);
    }, 8000);
  }
  useEffect(() => {
    const url = new URLSearchParams(window.location.search).get("url");
    setUrl(url);
  }, []);

  const addBox = ({ label, text, pageNumber }) => {
    setBoxes((prev) => [
      ...prev,
      {
        label: label,
        text,
        pageNumber,
      },
    ]);
  };

  useEffect(() => {
    console.log(boxes);
  }, [boxes]);

  useEffect(() => {
    if (loaded) {
      const canvasReference = canvasRef.current;
      canvasReference.pages.map((e, i) => {
        e.addEventListener("click", (el) => {
          if (label === null) {
            return;
          }
          const span = el.target;
          const parent = el.target.parentElement;
          const spans = parent.querySelectorAll("span");
          const index = Array.from(spans).indexOf(span);
          if (index === -1) {
            return;
          }
          span.classList.remove("title", "author", "none");
          span.classList.add(label);
            // addBox({
            //   label: span.classList[0],
            //   text: span.innerText,
            //   pageNumber: i + 1,
            // });
        });
      });
    }
  }, [loaded, label, boxes]);

  return (
    <div className="flex flex-row h-screen m-4">
      <div className="flex flex-col w-1/4">
        {!label ? <p>Select a Label to edit the pdf</p> : <p>Selected Label: {label}</p>}
        <div className="grow bg-neutral-400">
          <div className="space-y-4">
            <button
              className="bg-red-400 border-black border-2 p-2"
              onClick={() => {
                setLabel("title");
              }}
            >
              Title
            </button>
            <button
              className="bg-green-400 border-black border-2 p-2"
              onClick={() => {
                setLabel("author");
              }}
            >
              Author
            </button>
            <button
              className="bg-red-600 border-black border-2 p-2"
              onClick={() => {
                setLabel("none");
              }}
            >
              Remove Label
            </button>
          </div>
        </div>
        <p>Boxes</p>
        <div className="grow bg-neutral-400 overflow-y-auto">
          <div className="space-y-4">
            {boxes.map((box, i) => (
              <div key={i}>
                <p>Label: {box.label}</p>
                <p>Text: {box.text}</p>
                <p>Page: {box.pageNumber}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="overflow-y-auto">
        {url ? (
          <div>
            <Document
              ref={canvasRef}
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {/* display all pages */}
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
              {/* <Page pageNumber={pageNumber} /> */}
            </Document>
          </div>
        ) : (
          <div>... loading</div>
        )}
      </div>
    </div>
  );
}

export default DocumentPage;
