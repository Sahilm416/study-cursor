"use client";
import { UploadButtonComponent } from "./upload-button";
export const NoFiles = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div>
        <h1 className="text-2xl font-bold">You don't have any files yet</h1>
        <p className="text-sm text-gray-500">
          Upload your first file to get started
        </p>
      </div>
      <div className="mt-4">
        <UploadButtonComponent hideAllowedContent={false} />
      </div>
    </div>
  );
};
