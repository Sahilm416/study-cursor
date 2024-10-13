"use client";
import "@cyntler/react-doc-viewer/dist/index.css";
import { useEffect, useState, useCallback } from "react";
import { ChatBox } from "./ai";
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://esm.sh/pdfjs-dist@4.4.168/build/pdf.worker.min.js`;
const MemoizedDocViewer = React.memo(
  ({ url, chatOpen }: { url: string; chatOpen: boolean }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [scale, setScale] = useState(1.2);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    };

    const zoomIn = () =>
      setScale((prevScale) => Math.min(prevScale + 0.1, 1.3));
    const zoomOut = () =>
      setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));

    return (
      <div className="w-full h-full max-h-[calc(100vh-60px)] bg-[#121212] relative">
        <div
          className={`w-full h-full overflow-auto transition-all duration-500 ease-in-out`}
        >
          <div className="min-w-fit">
            <Document
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
              className="flex flex-col items-center mt-10"
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  scale={scale}
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderTextLayer={true}
                  className="mb-10"
                />
              ))}
            </Document>
          </div>
        </div>
        <div className="absolute top-4 left-4 flex gap-2 w-[100px] text-white text-lg bg-[#202020] p-2 border border-[#353535] rounded-lg shadow-md z-10">
          <button
            onClick={zoomIn}
            className="p-1 w-full hover:bg-[#242424] rounded-lg border border-[#353535]"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={zoomOut}
            className="p-1 w-full hover:bg-[#242424] rounded-lg border border-[#353535]"
            aria-label="Zoom out"
          >
            -
          </button>
        </div>
      </div>
    );
  }
);

export const DocOpener = ({
  url,
  name,
  id,
}: {
  url: string;
  name: string;
  id: string;
}) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && (e.key === "l" || e.key === "L")) {
      e.preventDefault();
      e.stopPropagation();
      setChatOpen(true);
      const selectedText = window.getSelection()?.toString();
      setSelectedText(selectedText || "");
    }
    if (e.key === "Escape") {
      setChatOpen(false);
    }
  }, []);

  useEffect(() => {
    // Prevent the default browser action for Ctrl+L
    const preventCtrlL = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === "l" || e.key === "L")) {
        e.preventDefault();
      }
    };

    // Add event listeners
    window.addEventListener("keydown", preventCtrlL, true);
    document.addEventListener("keydown", handleKeyDown);

    // Clean up
    return () => {
      window.removeEventListener("keydown", preventCtrlL, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-[60px] border-b border-[#353535] flex items-center px-4 bg-[#181818] text-white">
        <h2>{name}</h2>
      </div>
      <div className="w-full h-[calc(100%-60px)] flex relative">
        <div
          className={`w-full h-full transition-all duration-500 ease-in-out ${
            chatOpen ? "pr-[400px]" : ""
          }`}
        >
          <MemoizedDocViewer url={url} chatOpen={chatOpen} />
        </div>
        <div
          className={`absolute top-0 right-0 h-full transition-all duration-500 ease-in-out ${
            chatOpen ? "w-[400px]" : "w-0"
          } overflow-hidden`}
        >
          <ChatBox id={id} isOpen={chatOpen} selectedText={selectedText} />
        </div>
      </div>
    </div>
  );
};
