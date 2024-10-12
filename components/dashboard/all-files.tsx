"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NoFiles } from "./no-files";
import { MoreVertical, File, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { deleteFile } from "@/actions/files";
import { toast } from "sonner";
import { UploadButtonComponent } from "./upload-button";

interface File {
  id: string;
  file_name: string;
  uploaded_date: string;
  url: string;
  file_key: string;
}

export function AllFiles({ files: initialFiles }: { files: File[] }) {
  const router = useRouter();
  const [files, setFiles] = useState(initialFiles);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredFiles = files.filter((file) =>
    file.file_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (fileKey: string) => {
    toast.promise(deleteFile(fileKey), {
      loading: "Deleting file...",
      success: "File deleted successfully",
      error: "Failed to delete file",
    });
    setFiles(files.filter((f) => f.file_key !== fileKey));
    router.refresh();
  };

  return (
    <Card className="w-full h-full rounded-none border-none shadow-md bg-[#fafafa]">
      <CardHeader className="border-b sm:h-[60px] p-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <CardTitle className="text-2xl font-bold">All Files</CardTitle>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          {files.length > 0 && (
            <UploadButtonComponent hideAllowedContent={true} />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {filteredFiles.length === 0 ? (
          <div className="flex items-center justify-center h-[calc(100vh-200px)]">
            <NoFiles />
          </div>
        ) : (
          <div className="space-y-2">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className={`
                  flex items-center justify-between p-4 hover:bg-gray-200 rounded-lg transition-colors `}
              >
                <Link
                  href={file.url}
                  className="flex items-center space-x-4 flex-1"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.file_name}
                    </p>
                    <p className="text-xs text-gray-500">
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
                    <DropdownMenuItem className="cursor-pointer" asChild>
                      <Link
                        href={file.url}
                        download
                        className="flex items-center"
                      >
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(file.file_key)}
                      className="text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
