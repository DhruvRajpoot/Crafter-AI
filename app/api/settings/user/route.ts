import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    await clerkClient.users.deleteUser(userId);

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting user:", error);

    return NextResponse.json(
      { error: error.message || "Error deleting user" },
      { status: 500 }
    );
  }
}
