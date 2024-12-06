import type { QueryResolvers } from "./../../../gql-server/types.generated";
export const posts: NonNullable<QueryResolvers["posts"]> = async (
  _parent,
  _arg,
  ctx,
) => {
  /* Implement Query.posts resolver logic here */
  const { dbClient } = ctx;
  return await dbClient.post.findMany({ include: { comments: true } });
};
