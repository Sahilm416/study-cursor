"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, X } from "lucide-react";
import MarkdownResponse from "./markdown-response";
import { Skeleton } from "@/components/ui/skeleton";

export function ChatBox({
  selectedText: initialSelectedText,
  isOpen,
}: {
  selectedText: string;
  isOpen: boolean;
}) {
  const [selectedText, setSelectedText] = useState(initialSelectedText);
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setSelectedText(initialSelectedText);
  }, [initialSelectedText]);

  useEffect(() => {
    if (isOpen) {
      // Add a small delay to ensure the textarea is rendered
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initialSelectedText]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when submitting
    if (selectedText) {
      messages.push({
        id: Date.now().toString(),
        role: "user",
        content: selectedText,
      });
    }
    if (input.trim()) {
      handleSubmit(e, {
        options: {
          body: {
            selectedText,
          },
        },
      });
      setSelectedText("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleFormSubmit(e as any);
    }
  };

  const handleCancelSelectedText = () => {
    setSelectedText("");
  };

  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].role === "assistant"
    ) {
      setIsLoading(false);
    }
  }, [messages]);

  return (
    <div
      className={`flex flex-col h-full max-h-[calc(100vh-60px)] bg-background rounded-lg shadow-md transition-all duration-700 ease-in-out ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id}>
            <div
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-3/4 p-3 rounded-lg ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                <p className="text-sm font-semibold mb-1">
                  {m.role === "user" ? "You" : "AI"}
                </p>
                {m.role === "assistant" ? (
                  <MarkdownResponse content={m.content} />
                ) : (
                  <p className="whitespace-pre-wrap">{m.content}</p>
                )}
              </div>
            </div>
            {m.role === "user" && selectedText && (
              <div className="mt-2 p-2 bg-muted rounded-lg text-sm">
                <p className="font-semibold">Selected Text:</p>
                <p>{selectedText}</p>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-3/4 p-3 rounded-lg bg-secondary text-secondary-foreground">
              <p className="text-sm font-semibold mb-1">AI</p>
              <Skeleton className="h-4 w-[200px] mb-2" />
              <Skeleton className="h-4 w-[150px] mb-2" />
              <Skeleton className="h-4 w-[180px]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {selectedText && (
        <div className="px-4 py-2 bg-muted border-t border-b text-sm relative max-w-[400px] overflow-y-auto">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6"
            onClick={handleCancelSelectedText}
          >
            <X className="h-4 w-4" />
          </Button>
          <p className="font-semibold">Selected Text:</p>
          <p className="pr-8">{selectedText}</p>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="p-4 bg-background">
        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="pr-12 resize-none overflow-hidden"
            rows={1}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px`;
            }}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 bottom-2"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
