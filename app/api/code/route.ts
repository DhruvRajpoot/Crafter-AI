import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const instructionMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
};

const googleGenerativeAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY as string
);

const model = googleGenerativeAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig: {
    maxOutputTokens: 300,
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

    messages.push(instructionMessage);

    const prompt = messages
      .map(
        (msg: { role: string; content: string }) =>
          `${msg.role}: ${msg.content}`
      )
      .join("\n");

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = response.text();

    const systemMessage = {
      role: "system",
      content: output,
    };

    return NextResponse.json(systemMessage);
  } catch (error) {
    console.log("[Conversation Error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
