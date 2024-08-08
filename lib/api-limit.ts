import prismadb from "./prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

export const increaseApiLimit = async (userId: string): Promise<void> => {
  if (!userId) throw new Error("User ID is required");

  try {
    const userDetails = await prismadb.userDetails.findUnique({
      where: { userId },
    });

    if (userDetails) {
      const newCount = Math.min(userDetails.count + 1, MAX_FREE_COUNTS);

      await prismadb.userDetails.update({
        where: { userId },
        data: { count: newCount },
      });
    } else {
      await prismadb.userDetails.create({
        data: { userId, count: 1 },
      });
    }
  } catch (error) {
    console.error("Error increasing API limit:", error);
    throw new Error("Unable to increase API limit");
  }
};

export const apiLimitExhaust = async (userId: string): Promise<boolean> => {
  if (!userId) throw new Error("User ID is required");

  try {
    const userDetails = await prismadb.userDetails.findUnique({
      where: { userId },
    });

    const plan = userDetails?.plan;

    if (plan === "pro") return false;

    return userDetails ? userDetails.count >= MAX_FREE_COUNTS : false;
  } catch (error) {
    console.error("Error retrieving API limit count:", error);
    throw new Error("Unable to retrieve API limit count");
  }
};

export const isProUser = async (userId: string): Promise<boolean> => {
  if (!userId) throw new Error("User ID is required");

  try {
    const userDetails = await prismadb.userDetails.findUnique({
      where: { userId },
    });

    return userDetails ? userDetails.plan === "pro" : false;
  } catch (error) {
    console.error("Error checking if user is pro:", error);
    throw new Error("Unable to check user pro status");
  }
};
