import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { increaseApiLimit, apiLimitExhaust } from "@/lib/api-limit";

const instructionMessage = {
  role: "system",
  content:
    "You are an AI assistant. You must provide descriptive explanations and include code snippets where appropriate. Use code comments for explanations of the code.",
};

const googleGenerativeAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY as string
);

const model = googleGenerativeAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    maxOutputTokens: 2000,
    responseMimeType: "text/plain",
  },
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId)
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized access" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );

    if (!messages || messages.length === 0)
      return new NextResponse(
        JSON.stringify({ message: "Messages are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );

    const isLimitExhaust = await apiLimitExhaust(userId);

    if (isLimitExhaust)
      return new NextResponse(
        JSON.stringify({ message: "Free trial has expired" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );

    const prompt = [instructionMessage, ...messages]
      .map((msg: any) => msg.content)
      .join("\n");

    const result = await model.generateContentStream(prompt);

    const readableStream = new ReadableStream({
      start(controller) {
        (async () => {
          try {
            for await (const chunk of result.stream) {
              const chunkText = await chunk.text();
              controller.enqueue(chunkText);
            }
            controller.close();
          } catch (err) {
            console.error("Stream error:", err);
            controller.error(err);
          }
        })();
      },
    });

    if (!isLimitExhaust) await increaseApiLimit(userId);

    return new NextResponse(readableStream, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error: any) {
    console.error("[Code Error]", error);
    return new NextResponse(
      JSON.stringify({
        message: "Internal Server Error",
        details: error.message || "An unexpected error occurred.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
