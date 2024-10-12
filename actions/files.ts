"use server";
import { supa } from "@/db/client";
import { getUser } from "./auth";
import { UTApi } from "uploadthing/server";

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

export const deleteFile = async (file_key: string) => {
  const res = await getUser();
  if (!res.success || !res.user) {
    return {
      success: false,
      message: "User not authenticated",
    };
  }

  const utapi = new UTApi();

  const { data, error } = await supa
    .from("files")
    .select("*")
    .eq("file_key", file_key);

  if (error) {
    throw new Error(error.message);
  }

  if (data[0].uploaded_by !== res.user.email) {
    throw new Error("You are not authorized to delete this file");
  }

  if (data.length === 0) {
    throw new Error("File not found");
  }

  await supa.from("files").delete().eq("file_key", file_key);

  const { deletedCount } = await utapi.deleteFiles([file_key]);
  if (deletedCount === 0) {
    throw new Error("Failed to delete file");
  }
};
