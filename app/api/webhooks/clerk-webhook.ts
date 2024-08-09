import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();
const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET as string;

function verifySignature(payload: string, signature: string): boolean {
  const hash = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(payload, "utf8")
    .digest("hex");
  const isValid = hash === signature;
  return isValid;
}

export async function POST(req: NextRequest) {
  const { headers } = req;

  // Extract and parse the JSON body
  let body: any = null;
  try {
    body = await req.json();
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  // Extract signature from headers
  const signature = headers.get("clerk-signature") as string;
  const payload = JSON.stringify(body);

  // Verify the signature
  if (!verifySignature(payload, signature)) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  // Extract user data from webhook
  const { id: userId, email_addresses: emailAddresses } = body.data || {};
  const email = emailAddresses?.[0]?.email_address;

  if (userId && email) {
    try {
      // Save user details to Prisma
      await prisma.user.create({
        data: {
          id: userId,
          email,
          details: {
            create: {
              plan: "free",
            },
          },
        },
      });
      return NextResponse.json({ message: "User saved" });
    } catch (error) {
      console.error("Error saving user:", error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  }
}
