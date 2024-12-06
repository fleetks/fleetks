import { createSchema, createYoga } from "graphql-yoga";
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver } from "graphql";
import { cookies } from "next/headers";

import redisClient from "@/lib/redis";
import dbClient from "@/lib/db";
import { AUTH_TOKEN_NAME, PROGRAM_ENVIRONMENT } from "@/lib/config";
import resolvers, { Context, Extra } from "@/lib/resolvers";
import typeDefs from "@/schema/typeDefs";

console.log("NODE_ENV", PROGRAM_ENVIRONMENT);

let schema = createSchema({
  typeDefs,
  resolvers: resolvers,
});
// makeExecutableSchema()

schema = mapSchema(schema, {
  [MapperKind.OBJECT_FIELD]: function (fieldConfig) {
    const upperDirective = getDirective(schema, fieldConfig, "uppercase")?.[0];
    if (upperDirective) {
      const { resolve = defaultFieldResolver } = fieldConfig;

      return {
        ...fieldConfig,
        resolve: async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);
          if (typeof result === "string") {
            return result.toUpperCase();
          }
          return result;
        },
      };
    }

    const authDirective = getDirective(schema, fieldConfig, "auth")?.[0];
    if (authDirective) {
      console.log("authDirective", authDirective, fieldConfig);
      const { resolve = defaultFieldResolver } = fieldConfig;

      return {
        ...fieldConfig,
        resolve: async function (source, args, context: Context, info) {
          const { sessionId, userId } = context;
          if (!userId || !sessionId) {
            cookies().delete(AUTH_TOKEN_NAME);
            throw new Error("Not authenticated");
          }

          const user = await dbClient.user.findUnique({
            where: { id: userId },
          });
          if (!user || authDirective.requires !== user.role) {
            throw new Error("Invalid role");
          }

          const result = await resolve(source, args, context, info);
          return result;
        },
      };
    }
    return void 0;
  },
});

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  graphiql: true,
  fetchAPI: { Response },
  async context(_initialContext): Promise<Extra> {
    const sessionId = cookies().get(AUTH_TOKEN_NAME)?.value;

    const userId = sessionId && (await redisClient.get(sessionId));
    return {
      dbClient,
      sessionId,
      userId,
      redisClient,
    };
  },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
