"use client";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";

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
      endpoint="pdfUploader"
      onClientUploadComplete={(res) => {
        toast.success("File uploaded successfully");
        console.log(res[0]);
        window.location.reload();
      }}
      onUploadError={(error: Error) => {
        toast.error(`ERROR! ${error.message}`);
      }}
    />
  );
};
