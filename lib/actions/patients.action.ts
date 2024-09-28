import { CreateUserParams } from "@/types";
import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";

export const createUser = async (user: CreateUserParams) => {
  console.log({ users });

  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    console.log(newUser);
    return newUser;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log({ error });
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser?.users[0];
    }
  }
};
