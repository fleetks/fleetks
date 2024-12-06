import type { QueryResolvers } from "./../../../gql-server/types.generated";
export const hello: NonNullable<QueryResolvers["hello"]> = async (
  _parent,
  _arg,
  _ctx,
) => {
  /* Implement Query.hello resolver logic here */
  return "World!";
};
