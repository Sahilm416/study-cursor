import "server-only";
import { uploadFile } from "@/actions/files";
import { verifyUser } from "@/actions/verify";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ pdf: { maxFileSize: "32MB", maxFileCount: 1 } })
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

      // if (error) throw new Error(error.message);
      const res = await uploadFile({
        userId: metadata.userId!,
        url: file.url,
        name: file.name,
        file_key: file.key,
      });

      return res;
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
