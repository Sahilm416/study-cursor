import "server-only";
import { uploadFile, upsertToVector } from "@/actions/files";
import { verifyUser } from "@/actions/verify";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";
import { createSlices, textExtractor } from "./extra";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pdfUploader: f({ pdf: { maxFileSize: "32MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload

      const token = await verifyUser(req);

      // If you throw, the user will not be able to upload
      if (!token) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: token.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      let slices: string[] = [];

      const data = await textExtractor(file.url);

      console.log("data is ", data);

      slices = createSlices(data.text);
      console.log(`Slices created: ${slices.length}`);

      if (!metadata.userId) throw new Error("Failed to get user id");

      const res = await uploadFile({
        userId: metadata.userId,
        url: file.url,
        name: file.name,
        file_key: file.key,
      });

      console.log("database upload success");

      await upsertToVector(slices, file.url);

      console.log("vector upload success");

      return { success: res.success };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
