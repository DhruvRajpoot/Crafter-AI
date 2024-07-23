import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const googleGenerativeAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY as string
);

const model = googleGenerativeAI.getGenerativeModel({
  model: "text-to-image",
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = response.text();

    const systemMessage = {
      role: "system",
      content: output,
    };

    return NextResponse.json(systemMessage);
  } catch (error) {
    console.log("[Image Error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
