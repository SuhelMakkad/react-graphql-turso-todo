import { sql } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import { db } from "../drizzle/db.js";
import { todos } from "../drizzle/schema.js";
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
                .where(sql `${todos.userId} = ${context.user?.id}`);
        },
    },
    Mutation: {
        addTodo: async (parent, args, context) => {
            const todo = {
                id: uuid(),
                todo: args.todo,
                completed: args.completed || false,
                userId: context.user?.id,
            };
            await db.insert(todos).values(todo).execute();
            return todo;
        },
        deleteTodo: async (parent, args, context) => {
            await db
                .delete(todos)
                .where(sql `${todos.id} = ${args.id} AND ${todos.userId} = ${context.user?.id}`);
            return args.id;
        },
        updateTodoStatus: async (parent, args, context) => {
            await db
                .update(todos)
                .set({
                completed: args.completed || false,
            })
                .where(sql `${todos.id} = ${args.id} AND ${todos.userId} = ${context.user?.id}`);
            return args.id;
        },
    },
};
//# sourceMappingURL=resolvers.js.map