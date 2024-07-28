import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { codes } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!Array.isArray(codes)) {
      return new NextResponse("Codess must be an array.", {
        status: 400,
      });
    }

    await prisma.userCode.upsert({
      where: { userId },
      update: { codes: JSON.stringify(codes) },
      create: { userId, codes: JSON.stringify(codes) },
    });

    return NextResponse.json({
      message: "Codess saved successfully.",
      codes,
    });
  } catch (error) {
    console.error("[Save Codes Error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
