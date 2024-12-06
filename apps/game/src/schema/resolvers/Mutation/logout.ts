import { cookies } from "next/headers";
import type { MutationResolvers } from "./../../../gql-server/types.generated";
import { AUTH_TOKEN_NAME } from "@/lib/config";
export const logout: NonNullable<MutationResolvers["logout"]> = async (
  _parent,
  _arg,
  { sessionId, redisClient },
) => {
  /* Implement Mutation.logout resolver logic here */
  if (sessionId) {
    await redisClient.del(sessionId);
  }
  cookies().delete(AUTH_TOKEN_NAME);
  return true;
};
