import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

// TODO : Implement conversation with history data
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    if (!apiKey) {
      return NextResponse.json("GEMINI_API_KEY is not defined", {
        status: 500,
      });
    }

    const googleGenerativeAI = new GoogleGenerativeAI(apiKey);

    const model = googleGenerativeAI.getGenerativeModel({
      model: "gemini-pro",
    });

    const result = await model.generateContent(messages.content);

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
