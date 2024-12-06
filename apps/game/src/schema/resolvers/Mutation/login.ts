import { randomUUID } from "node:crypto";
import type { MutationResolvers } from "./../../../gql-server/types.generated";
import { cookies } from "next/headers";
import { AUTH_TOKEN_NAME, PROGRAM_ENVIRONMENT } from "@/lib/config";

export const login: NonNullable<MutationResolvers["login"]> = async (
  _parent,
  { loginInput },
  { dbClient, redisClient },
) => {
  /* Implement Mutation.login resolver logic here */
  const uuid = randomUUID();
  const { email } = loginInput;
  const account = await dbClient.account.upsert({
    create: {
      email,
      user: {
        create: {},
      },
    },
    update: {
      email,
    },
    where: {
      email,
    },
  });
  await redisClient.set(uuid, account.userId, "EX", 60);
  const cookieStore = cookies();
  cookieStore.set(AUTH_TOKEN_NAME, uuid, {
    httpOnly: true,
    secure: PROGRAM_ENVIRONMENT === "production",
  });
  return true;
};
