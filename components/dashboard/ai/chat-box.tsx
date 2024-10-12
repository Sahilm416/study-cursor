"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const ChatBox = ({
  selectedText,
  isOpen,
}: {
  selectedText: string;
  isOpen: boolean;
}) => {
  return (
    <div className="w-full h-full max-h-[calc(100vh-60px)] overflow-y-auto bg-white border-l border-gray-200">
      {selectedText}
    </div>
  );
};
