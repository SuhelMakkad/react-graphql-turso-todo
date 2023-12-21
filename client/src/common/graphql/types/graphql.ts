/* eslint-disable */
import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  addTodo: Scalars['ID']['output'];
  addUser: Scalars['ID']['output'];
  deleteTodo?: Maybe<Array<Todo>>;
};


export type MutationAddTodoArgs = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  todo: Scalars['String']['input'];
};


export type MutationAddUserArgs = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteTodoArgs = {
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  todos?: Maybe<Array<Maybe<Todo>>>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryTodosArgs = {
  userId: Scalars['ID']['input'];
};

export type Todo = {
  __typename?: 'Todo';
  completed?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  todo: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  todos?: Maybe<Array<Todo>>;
};
