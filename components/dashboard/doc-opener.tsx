"use client";
import DocViewer, { PDFRenderer } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { useEffect, useState, useCallback } from "react";
import { ChatBox } from "./ai";
import React from 'react';

const MemoizedDocViewer = React.memo(({ url }: { url: string }) => (
  <DocViewer
    theme={{
      disableThemeScrollbar: true,
    }}
    config={{
      header: {
        disableFileName: true,
        disableHeader: true,
      },
      pdfVerticalScrollByDefault: true,
      pdfZoom: {
        defaultZoom: 0.7,
        zoomJump: 0.2,
      },
    }}
    className="selection:bg-yellow-500 object-contain overflow-y-auto max-h-[calc(100vh-60px)] bg-[#fafafa] selection:text-white relative"
    documents={[{ uri: url }]}
    pluginRenderers={[PDFRenderer]}
  />
));

export const DocOpener = ({ url, name, id }: { url: string; name: string; id: string }) => {
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
      <div className="w-full h-[60px] border-b flex items-center px-4">
        <h2>{name}</h2>
      </div>
      <div className="w-full h-[calc(100%-60px)] flex">
        <div className={`transition-all duration-500 ease-in-out ${chatOpen ? 'w-[calc(100%-400px)]' : 'w-full'}`}>
          <MemoizedDocViewer url={url} />
        </div>
        <div className={`flex-shrink-0 transition-all duration-500 ease-in-out ${chatOpen ? 'w-[400px]' : 'w-0'} overflow-hidden`}>
          <ChatBox id={id} isOpen={chatOpen} selectedText={selectedText}/>
        </div>
      </div>
    </div>
  );
};
