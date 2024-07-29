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

    const userCode = await prisma.userCode.findUnique({
      where: { userId },
    });

    if (!userCode || !userCode.codes) {
      return NextResponse.json({ message: "No codes found" }, { status: 404 });
    }

    let codes: { role: string; content: string }[];
    codes = JSON.parse(userCode.codes as string);

    return NextResponse.json(codes);
  } catch (error) {
    console.error("[Get Codes Error]", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
