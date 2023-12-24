import { sql } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import { db } from "../drizzle/db";
import { todos, users } from "../drizzle/schema";
import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    todos: (parent, args, context) => {
      return db
        .select({
          id: todos.id,
          userId: todos.userId,
          todo: todos.todo,
          completed: todos.completed,
        })
        .from(todos)
        .where(sql`${todos.userId} = ${context.userId}`);
    },
  },
  Mutation: {
    addTodo: async (parent, args, context) => {
      const todo = {
        id: uuid(),
        todo: args.todo,
        completed: args.completed || false,
        userId: context.userId,
      };

      await db.insert(todos).values(todo).execute();

      return todo;
    },

    deleteTodo: async (parent, args, context) => {
      await db
        .delete(todos)
        .where(
          sql`${todos.id} = ${args.id} AND ${todos.userId} = ${context.userId}`
        );
      return args.id;
    },

    updateTodoStatus: async (parent, args, context) => {
      await db
        .update(todos)
        .set({
          completed: args.completed || false,
        })
        .where(
          sql`${todos.id} = ${args.id} AND ${todos.userId} = ${context.userId}`
        );
      return args.id;
    },
  },
};
