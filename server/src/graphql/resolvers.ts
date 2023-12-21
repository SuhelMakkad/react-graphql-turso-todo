import { sql } from "drizzle-orm";
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
        .where(sql`${todos.userId} = ${args.userId}`);
    },
  },
  Mutation: {
    addTodo: async (parent, args, context) => {
      const todo = {
        id: Date.now().toString(),
        todo: args.todo,
        completed: args.completed || false,
        userId: "1703165024039",
      };

      await db.insert(todos).values(todo).execute();

      return todo;
    },

    addUser: async (parent, args, context) => {
      const user = {
        id: Date.now().toString(),
        ...args,
      };
      await db.insert(users).values(user).execute();

      return user.id;
    },
  },
};
