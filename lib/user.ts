import prismadb from "./prismadb";

export async function createUser(user: any) {
  try {
    const {
      id: userId,
      email_addresses: emailAddresses,
      first_name: firstName,
      last_name: lastName,
    } = user || {};

    const email = emailAddresses?.[0]?.email_address;

    const newUser = await prismadb.user.create({
      data: {
        id: userId,
        email,
        details: {
          create: {
            firstName,
            lastName,
          },
        },
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Unable to create user");
  }
}
