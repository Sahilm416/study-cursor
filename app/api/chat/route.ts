import { getUser } from "@/actions/auth";
import { index } from "@/utils/vector";
import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages, Message } from "ai";
import { NextResponse } from "next/server";
import { instruction } from "./extra";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const res = await getUser();
  if (!res?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { messages, selectedText, id } = (await req.json()) as {
    messages: Message[];
    selectedText: string;
    id: string;
  };

  const namespace = index.namespace(id.toString());

  // Determine the query text, prioritizing selectedText if available
  const queryText = selectedText || messages[messages.length - 1].content;

  const context = await namespace.query({
    data: queryText.toLowerCase(),
    topK: 5,
    includeData: true,
  });

  const contextArray = context.map((c) => c.data || "No Context Found");

  const query = {
    question: messages[messages.length - 1].content,
    focus: selectedText || null,
    context: contextArray,
    messageHistory: messages.slice(0, -1), // Include previous messages for context
  };

  const result = await streamText({
    system: instruction(query),
    model: openai("gpt-4-turbo"),
    messages: convertToCoreMessages(messages),
    temperature: 0.7, // Add temperature for controlled randomness
    maxTokens: 500, // Limit response length
  });

  return result.toDataStreamResponse();
}
