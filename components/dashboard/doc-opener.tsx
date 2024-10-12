"use client";
import DocViewer, {
  DocViewerRenderers,
  PDFRenderer,
} from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

export const DocOpener = ({ url, name }: { url: string; name: string }) => {
  return (
    <div className="w-full max-w-[900px] h-full relative">
      <div className="w-full h-[60px] border-b flex items-center px-4">
        <h2>{name}</h2>
      </div>
      <DocViewer
        config={{
          header: {
            disableFileName: true,
            disableHeader: true,
          },

          pdfVerticalScrollByDefault: false,
        }}
        className="selection:bg-yellow-500 h-full overflow-y-auto max-h-[calc(100vh-60px)] bg-[#fafafa] selection:text-white relative"
        documents={[{ uri: url }]}
        pluginRenderers={[PDFRenderer]}
      />
    </div>
  );
};
