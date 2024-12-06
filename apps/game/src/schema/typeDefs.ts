const typeDefs = /* GraphQL */ `
  input LoginInput {
    email: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    content: String!
  }

  type Query {
    posts: [Post!]!
    hello: String! @uppercase
    me: String! @auth(requires: USER)
  }

  type Mutation {
    login(loginInput: LoginInput!): Boolean!
    logout: Boolean!
  }

  enum Role {
    ADMIN
    MEMBER
    USER
  }

  directive @uppercase on FIELD_DEFINITION
  directive @auth(requires: Role!) on FIELD_DEFINITION
`;

export default typeDefs;
