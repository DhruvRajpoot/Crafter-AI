import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { conversations } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!Array.isArray(conversations)) {
      return new NextResponse("Conversations must be an array.", {
        status: 400,
      });
    }

    await prisma.userConversation.upsert({
      where: { userId },
      update: { conversations: JSON.stringify(conversations) },
      create: { userId, conversations: JSON.stringify(conversations) },
    });

    return NextResponse.json({
      message: "Conversations saved successfully.",
      conversations,
    });
  } catch (error) {
    console.error("[Save Conversation Error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
