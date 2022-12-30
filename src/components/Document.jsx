import React, { useEffect, useRef, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Document, Page } from "react-pdf/dist/esm/entry.vite";
function DocumentPage({ url }) {
  const canvasRef = useRef(null);
  const [numPages, setNumPages] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [label, setLabel] = useState(null);
  const labelRef = useRef(null);
  const [boxes, setBoxes] = useState([]);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem(`box-${url}`);
    if (data) {
      setBoxes(JSON.parse(data));
    }
    const jsonData = JSON.parse(data);
    if (jsonData === null || jsonData === "null" || jsonData === undefined) {
      setWaiting(false);
      return;
    }
    if (loaded) {
      console.log("loaded");
      console.log(boxes);
      const canvasReference = canvasRef.current;
      jsonData.map((box) => {
        const span =
          canvasReference.pages[box.pageNumber - 1].querySelectorAll("span")[
          box.index
          ];
        span.classList.add(box.label);
      });
      setWaiting(false);
    }
  }, [loaded]);

  useEffect(() => {
    if (label === null) {
      return;
    }
    addToLocalStorage(`box-${url}`, boxes);
  }, [boxes]);

  const addToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setTimeout(() => {
      setLoaded(true);
    }, 5000);
  }

  const addBox = ({ label, text, pageNumber, index }) => {
    setBoxes((prev) => [
      ...prev,
      {
        label: label,
        text,
        pageNumber,
        index,
      },
    ]);
  };

  const removeBox = ({ index, pageNumber }) => {
    setBoxes((prev) => {
      const newBoxes = prev.filter((box) => {
        return box.pageNumber !== pageNumber || box.index !== index;
      });
      return newBoxes;
    });
  };

  const updateBox = ({ index, pageNumber, label }) => {
    setBoxes((prev) => {
      const newBoxes = prev.map((box) => {
        if (box.pageNumber === pageNumber && box.index === index) {
          return {
            ...box,
            label: label,
          };
        }
        return box;
      });
      return newBoxes;
    });
  };

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
          if (span.classList.length === 0 && labelRef.current.id !== "none") {
            addBox({
              label: labelRef.current.id,
              text: span.innerText,
              pageNumber: i + 1,
              index: index,
            });
          }
          if (labelRef.current.id === "none") {
            const check = boxes.filter((box) => {
              return box.pageNumber === i + 1 && box.index === index;
            });
            if (check.length === 0) {
              return;
            }
            removeBox({
              index: index,
              pageNumber: i + 1,
            });
          }
          if (span.classList.length !== 0 && labelRef.current.id !== "none") {
            const check = boxes.filter((box) => {
              return box.pageNumber === i + 1 && box.index === index;
            });
            if (check.length === 0) {
              return;
            }
            updateBox({
              index: index,
              pageNumber: i + 1,
              label: labelRef.current.id,
            });
          }
          span.classList.remove("title", "author", "none");
          span.classList.add(labelRef.current.id);
        });
      });
    }
  }, [loaded, label]);

  return (
    <>
      <div className="sticky top-0 w-full text-center">
        {waiting && <p className="py-2 text-lg bg-neutral-400">Wait for the pdf to Load</p>}
      </div>
      <div className="flex flex-row h-screen p-4 bg-neutral-100">
        <div className="flex flex-col w-2/6">
          <div className="bg-neutral-400 py-4 px-2">
            {!label ? (
              <p className="text-lg">Select any Label to Edit the PDF</p>
            ) : (
              <p className="text-lg" ref={labelRef} id={label}>
                Selected Label: <span className="uppercase font-semibold">{label}</span>
              </p>
            )}
            <div className="space-x-4 space-y-2 flex-wrap">
              <button
                className="bg-red-400 border-red-600 hover:bg-red-600 hover:text-white rounded border-2 px-4 py-2"
                onClick={() => {
                  setLabel("title");
                }}
              >
                Title
              </button>
              <button
                className="bg-green-400 border-green-600 hover:bg-green-600 hover:text-white rounded border-2 px-4 py-2"
                onClick={() => {
                  setLabel("author");
                }}
              >
                Author
              </button>
              <button
                className="bg-red-600 border-red-800 hover:bg-red-800 text-white rounded border-2 px-4 py-2"
                onClick={() => {
                  setLabel("none");
                }}
              >
                Remove Label
              </button>
            </div>
          </div>
          <div className="grow bg-neutral-300 overflow-y-auto py-4 px-2">
            <p className="uppercase text-xl pb-2">Boxes</p>
            <div className="space-y-2">
              {boxes.map((box, i) => (
                <div key={i} className='p-2 border border-neutral-400 rounded'>
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
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
              </Document>
            </div>
          ) : (
            <div>... loading</div>
          )}
        </div>
      </div>
    </>
  );
}

export default DocumentPage;
