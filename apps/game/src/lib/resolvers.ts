import dbClient from "./db";
import redisClient from "./redis";
import { YogaInitialContext } from "graphql-yoga";

import { resolvers } from "@/gql-server/resolvers.generated";

export type Extra = {
  dbClient: typeof dbClient;
  redisClient: typeof redisClient;
  sessionId?: string;
  userId?: string | null;
};
export type Context = YogaInitialContext & Extra;

// const resolvers_: Resolvers<Context> = {
//     Post: {
//         async comments (parent,_, { dbClient }) {
//             console.log('parent', parent)
//             const commentsOfPost = await dbClient.comment.findMany({where: { postId: parent.id }})
//             console.log('commentsOfPost', commentsOfPost)
//             return commentsOfPost
//         },
//         ...(function () {

//             let p: Promise<Post | null> | undefined = undefined

//             let i = 0
//             async function getPost(id: string) {
//                 console.log('called', ++i)
//                 const post = await dbClient.post.findUnique({where: { id }})
//                 if ( !post ) {
//                     throw new Error('null')
//                 }
//                 return post
//             }

//             function common(key: 'id' | 'title' | 'content') {
//                 return async function ({id}: { id: string }) {
//                     if ( !p ) {
//                         p = getPost(id)
//                     }

//                     const result = await p
//                     if ( !result ) {
//                         throw new Error('asdf')
//                     }
//                     return result[key]
//                 }
//             }

//             return {
//                 id: common('id'),
//                 title: common('title'),
//                 content: common('content')
//             }
//         }())
//     },
//     Query: {
//         async posts() {
//             return await dbClient.post.findMany()
//         },
//         hello() {
//             return 'Hello!'
//         },
//         async me(_parent, _args, context) {
//             const { userId, dbClient } = context

//             // invariant?
//             const user = (await dbClient.user.findUnique({where: { id: userId }, include: { accounts: true}}))!
//             return user.accounts[0].email
//         }
//     },
//     Mutation: {
//         async login(_parent, args, _context) {
//             // const { sessionId } = context
//             const uuid = randomUUID()
//             const { email } = args.loginInput
//             const account = await dbClient.account.upsert({
//                 create: {
//                     email,
//                     user: {
//                         create: {}
//                     }
//                 },
//                 update: {
//                     email
//                 },
//                 where: {
//                     email
//                 },
//             })
//             await redisClient.set(uuid, account.userId, "EX", 60)
//             const cookieStore = cookies()
//             cookieStore.set(AUTH_TOKEN_NAME, uuid, { httpOnly: true, secure: PROGRAM_ENVIRONMENT === 'production'})
//             return true
//         },
//         async logout(_parent, _args, context) {
//             const { sessionId } = context
//             if ( sessionId ) {
//                 await redisClient.del(sessionId)
//             }
//             cookies().delete(AUTH_TOKEN_NAME)

//             return true
//         },
//     }
// }

export default resolvers;
