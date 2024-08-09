import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { increaseApiLimit, apiLimitExhaust } from "@/lib/api-limit";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    if (!prompt) return new NextResponse("Prompt is required", { status: 400 });

    const isLimitExhaust = await apiLimitExhaust(userId);

    if (isLimitExhaust)
      return new NextResponse("Free trial has expired", { status: 403 });

    const input = {
      prompt_b: prompt,
    };

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      { input }
    );

    if (!isLimitExhaust) await increaseApiLimit(userId);

    return NextResponse.json(response);
  } catch (error) {
    console.log("[Music Error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
