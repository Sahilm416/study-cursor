"use client";

import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
export const NoFiles = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div>
        <h1 className="text-2xl font-bold">You don't have any files yet</h1>
        <p className="text-sm text-gray-500">
          Upload your first file to get started
        </p>
      </div>
      <div className="mt-4">
        <UploadButton
          appearance={{
            button: "bg-black text-white",
          }}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            router.refresh();
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
    </div>
  );
};
