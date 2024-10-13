"use client";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { upsertToVector } from "@/actions/files";
export const UploadButtonComponent = ({
  hideAllowedContent,
}: {
  hideAllowedContent: boolean;
}) => {
  return (
    <UploadButton
      appearance={{
        button: "bg-black text-white",
        allowedContent: hideAllowedContent ? "hidden" : "block",
      }}
      onUploadBegin={() => {
        toast.info("Uploading File...");
      }}
      onUploadProgress={(p) => {
        if (p > 90) {
          toast.info(`Indexing File...`);
        }
      }}
      endpoint="pdfUploader"
      onClientUploadComplete={(res) => {
        toast.success("Completed the process successfully");
        console.log(res[0]);
        window.location.reload();
      }}
      onUploadError={(error: Error) => {
        toast.error(`ERROR! ${error.message}`);
      }}
    />
  );
};
