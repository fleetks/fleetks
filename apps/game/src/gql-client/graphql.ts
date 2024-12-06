/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Comment = {
  __typename?: "Comment";
  content: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
};

export type LoginInput = {
  email: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  login: Scalars["Boolean"]["output"];
  logout: Scalars["Boolean"]["output"];
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type Post = {
  __typename?: "Post";
  comments: Array<Comment>;
  content: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  title: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"]["output"];
  me: Scalars["String"]["output"];
  posts: Array<Post>;
};

export enum Role {
  Admin = "ADMIN",
  Member = "MEMBER",
  User = "USER",
}
