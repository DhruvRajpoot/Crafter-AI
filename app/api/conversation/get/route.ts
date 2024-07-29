import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userConversation = await prisma.userConversation.findUnique({
      where: { userId },
    });

    if (!userConversation || !userConversation.conversations) {
      return NextResponse.json(
        { message: "No conversations found" },
        { status: 404 }
      );
    }

    let conversations: { role: string; content: string }[];
    conversations = JSON.parse(userConversation.conversations as string);

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("[Get Conversations Error]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
