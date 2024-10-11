"use server";
import { supa } from "@/db/client";

type FileMetadata = {
  userId: string;
  url: string;
  name: string;
};

export const uploadFile = async (metadata: FileMetadata) => {
  const { data, error } = await supa.from("files").insert({
    uploaded_by: metadata.userId,
    file_name: metadata.name,
    url: metadata.url,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }
  return {
    success: true,
    message: "File uploaded successfully",
  };
};
