import type { PostResolvers } from "./../../gql-server/types.generated";
export const Post: PostResolvers = {
  /* Implement Post resolver logic here */
  async comments(parent, __, { dbClient }) {
    const commentsOfPost = await dbClient.comment.findMany({
      where: { postId: parent.id },
    });
    console.log("commentsOfPost", commentsOfPost);
    return commentsOfPost;
  },
};
