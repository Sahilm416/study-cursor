"use client";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const UploadButtonComponent = ({
  hideAllowedContent,
}: {
  hideAllowedContent: boolean;
}) => {
  const router = useRouter();
  return (
    <UploadButton
      appearance={{
        button: "bg-black text-white",
        allowedContent: hideAllowedContent ? "hidden" : "block",
      }}
      endpoint="pdfUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        toast.success("File uploaded successfully");
        router.refresh();
      }}
      onUploadError={(error: Error) => {
        toast.error(`ERROR! ${error.message}`);
      }}
    />
  );
};
