import type { QueryResolvers } from "./../../../gql-server/types.generated";
export const me: NonNullable<QueryResolvers["me"]> = async (
  _parent,
  _arg,
  { dbClient, userId },
) => {
  /* Implement Query.me resolver logic here */
  // invariant?
  const user = (await dbClient.user.findUnique({
    where: { id: userId! },
    include: { accounts: true },
  }))!;
  return user.accounts[0].email;
};
