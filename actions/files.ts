"use server";
import { supa } from "@/db/client";
import { getUser } from "./auth";
import { UTApi } from "uploadthing/server";
import { index } from "@/utils/vector";

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

  const { data: idData, error: idError } = await supa
    .from("files")
    .delete()
    .eq("file_key", file_key)
    .select("id");

  if (idError) {
    throw new Error(idError.message);
  }

  index.deleteNamespace(idData[0].id!.toString());

  const { deletedCount } = await utapi.deleteFiles([file_key]);
  if (deletedCount === 0) {
    throw new Error("Failed to delete file");
  }
};

export const upsertToVector = async (slices: string[], url: string) => {
  const { data, error } = await supa.from("files").select("*").eq("url", url);
  if (error) {
    throw new Error(error.message);
  }
  console.log("url is ", data[0].id!);
  try {
    const namespace = index.namespace(data[0].id!.toString());
    const upsertPromises = slices.map((slice, index) =>
      namespace.upsert({
        id: index.toString(),
        data: slice,
      })
    );
    await Promise.all(upsertPromises);
  } catch (error) {
    console.error("Error upserting to vector:", error);
    throw new Error("Failed to upsert to vector");
  }
};

export const getFile = async (id: string) => {
  const res = await getUser();

  if (!res.success || !res.user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supa.from("files").select("*").eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  if (data[0].uploaded_by !== res.user.email) {
    throw new Error("You are not authorized to access this file");
  }

  return data[0];
};
