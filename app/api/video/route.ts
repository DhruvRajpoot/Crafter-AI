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
      prompt: prompt,
    };

    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      { input }
    );

    if (!isLimitExhaust) await increaseApiLimit(userId);

    return NextResponse.json(response);
  } catch (error) {
    console.log("[Video Error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
