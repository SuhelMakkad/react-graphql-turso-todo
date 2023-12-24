import { sql } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import { db } from "../drizzle/db.js";
import { todos, users } from "../drizzle/schema.js";
export const resolvers = {
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
                .where(sql `${todos.userId} = ${args.userId}`);
        },
    },
    Mutation: {
        addTodo: async (parent, args, context) => {
            const todo = {
                id: uuid(),
                todo: args.todo,
                completed: args.completed || false,
                userId: "1703165024039",
            };
            await db.insert(todos).values(todo).execute();
            return todo;
        },
        deleteTodo: async (parent, args, context) => {
            await db.delete(todos).where(sql `${todos.id} = ${args.id}`);
            return args.id;
        },
        updateTodoStatus: async (parent, args, context) => {
            await db
                .update(todos)
                .set({
                completed: args.completed || false,
            })
                .where(sql `${todos.id} = ${args.id}`);
            return args.id;
        },
        addUser: async (parent, args, context) => {
            const user = {
                id: uuid(),
                ...args,
            };
            await db.insert(users).values(user).execute();
            return user.id;
        },
    },
};
//# sourceMappingURL=resolvers.js.map