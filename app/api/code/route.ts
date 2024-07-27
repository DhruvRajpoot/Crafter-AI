import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

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

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messages || messages.length === 0) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit(userId);

    if (!freeTrial) {
      return new NextResponse("Free trial has expired", { status: 403 });
    }

    messages.push(instructionMessage);

    const prompt = messages.map((msg: any) => msg.content).join("\n");

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

    await increaseApiLimit(userId);

    return new NextResponse(readableStream, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("[Code Error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
