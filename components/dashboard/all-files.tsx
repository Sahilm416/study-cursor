"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NoFiles } from "./no-files";
import { MoreVertical, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteFile } from "@/actions/files";
import { toast } from "sonner";

interface File {
  id: string;
  file_name: string;
  uploaded_date: string;
  url: string;
  file_key: string;
}

export const AllFiles = ({ files }: { files: File[] }) => {
  const router = useRouter();
  return (
    <Card className="w-full h-full rounded-none border-none bg-[#fafafa]">
      <CardHeader className="border-b h-[60px]">
        <CardTitle>All Files</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {files.length === 0 ? (
          <div className="flex items-center justify-center h-[calc(100vh-120px)]">
            <NoFiles />
          </div>
        ) : (
          <ul className="divide-y">
            {files.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between p-4 hover:bg-muted/50"
              >
                <Link
                  href={file.url}
                  className="flex items-center space-x-4 flex-1"
                >
                  <File className="h-6 w-6 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file.file_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {file.uploaded_date}
                    </p>
                  </div>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href={file.url} download>
                        Download
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={async () => {
                        toast.promise(deleteFile(file.file_key), {
                          loading: "Deleting file...",
                          success: "File deleted successfully",
                          error: "Failed to delete file",
                          finally: () => {
                            router.refresh();
                          },
                        });
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
