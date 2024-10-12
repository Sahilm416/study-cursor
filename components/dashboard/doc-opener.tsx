"use client";
import DocViewer, {
  DocViewerRenderers,
  PDFRenderer,
} from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";


export const DocOpener = ({ url }: { url: string }) => {
  return (
    <div className="w-full max-w-[900px] h-full overflow-y-auto max-h-screen relative">
      
      <DocViewer
        config={{
          header: {
            disableFileName: true,
            disableHeader: true,
          },

          pdfVerticalScrollByDefault: !false,
        }}
        className="selection:bg-yellow-500 selection:text-white relative"
        documents={[{ uri: url }]}
        pluginRenderers={[PDFRenderer]}
      />
    </div>
  );
};
