/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import type { Resolvers } from "./types.generated";
import { hello as Query_hello } from "./../schema/resolvers/Query/hello";
import { me as Query_me } from "./../schema/resolvers/Query/me";
import { posts as Query_posts } from "./../schema/resolvers/Query/posts";
import { login as Mutation_login } from "./../schema/resolvers/Mutation/login";
import { logout as Mutation_logout } from "./../schema/resolvers/Mutation/logout";
import { Comment } from "./../schema/resolvers/Comment";
import { Post } from "./../schema/resolvers/Post";
export const resolvers: Resolvers = {
  Query: { hello: Query_hello, me: Query_me, posts: Query_posts },
  Mutation: { login: Mutation_login, logout: Mutation_logout },

  Comment: Comment,
  Post: Post,
};
