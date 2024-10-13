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

export function AllFiles({ files }: { files: File[] }) {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredFiles = files.filter((file) =>
    file.file_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (fileKey: string) => {
    toast.promise(deleteFile(fileKey), {
      loading: "Deleting file...",
      success: () => {
        router.refresh();
        return "File deleted successfully";
      },
      error: "Failed to delete file",
    });
    router.refresh();
  };

  return (
    <Card className="w-full h-full rounded-none border-none shadow-md bg-[#181818]">
      <CardHeader className="border-b border-[#353535] sm:h-[60px] p-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <CardTitle className="text-2xl font-bold text-white">
          All Files
        </CardTitle>
        {files.length > 0 && (
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 bg-[#202020] border border-[#353535] text-white"
            />

            <UploadButtonComponent hideAllowedContent={true} />
          </div>
        )}
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
                  flex items-center justify-between border border-[#353535] p-4 hover:bg-[#141414] rounded-lg transition-colors `}
              >
                <Link
                  href={`/dashboard/files/open?id=${file.id}`}
                  className="flex items-center space-x-4 flex-1"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {file.file_name}
                    </p>
                    <p className="text-xs text-white">{file.uploaded_date}</p>
                  </div>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="hover:bg-[#202020] rounded-lg"
                    asChild
                  >
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4 text-white" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="bg-[#202020] text-white border border-[#353535]"
                    align="end"
                  >
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-[#202020] "
                      asChild
                    >
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
                      className="text-red-600 cursor-pointer hover:bg-[#202020]"
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
