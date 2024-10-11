"use server";
import { supa } from "@/db/client";
import { getUser } from "./auth";

type FileMetadata = {
  userId: string;
  url: string;
  name: string;
  file_key: string;
};

export const uploadFile = async (metadata: FileMetadata) => {
  const { data, error } = await supa.from("files").insert({
    uploaded_by: metadata.userId,
    file_name: metadata.name,
    url: metadata.url,
    file_key: metadata.file_key,
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

export const getCurrentUserFiles = async () => {
  const res = await getUser();
  if (!res.success || !res.user) {
    return {
      success: false,
      message: "User not authenticated",
      files: [],
    };
  }

  const { data, error } = await supa
    .from("files")
    .select("*")
    .eq("uploaded_by", res.user.email);

  if (error) {
    return {
      success: false,
      message: error.message,
      files: [],
    };
  }

  return {
    success: false,
    message: "Fetched user files",
    files: data,
  };
};
