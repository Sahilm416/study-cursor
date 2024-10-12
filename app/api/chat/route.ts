import { getUser } from "@/actions/auth";
import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages } from "ai";
import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const res = await getUser();
  if (!res?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { messages, selectedText } = await req.json();

  const result = await streamText({
    system: `question: ${
      messages[messages.length - 1].content
    } context: ${selectedText} , instructions: Respond in markdown format. Make sure respond in concise manner. Don't use any other formatting.`,
    model: openai("gpt-4-turbo"),
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
