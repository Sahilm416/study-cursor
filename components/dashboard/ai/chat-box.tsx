"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, X } from "lucide-react";

export function ChatBox({
  selectedText: initialSelectedText,
  isOpen,
}: {
  selectedText: string;
  isOpen: boolean;
}) {
  const [selectedText, setSelectedText] = useState(initialSelectedText);
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat({
    initialMessages: [
      { id: "1", role: "system", content: `Selected text: ${selectedText}` },
    ],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setSelectedText(initialSelectedText);
    if (initialSelectedText) {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: Date.now().toString(), role: "system", content: `New selected text: ${initialSelectedText}` }
      ]);
    }
  }, [initialSelectedText, setMessages]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  return (
    <div className={`flex flex-col h-full max-h-[calc(100vh-60px)] bg-background rounded-lg shadow-md transition-all duration-700 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
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
                <p className="whitespace-pre-wrap">{m.content}</p>
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
        <div ref={messagesEndRef} />
      </div>

      {selectedText && (
        <div className="px-4 py-2 bg-muted border-t border-b text-sm relative">
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
          autoFocus
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
