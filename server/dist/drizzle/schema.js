import { relations, sql } from "drizzle-orm";
import { index, integer, sqliteTable, text, uniqueIndex, int, } from "drizzle-orm/sqlite-core";
export const users = sqliteTable("users", {
    id: text("id").primaryKey(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    email: text("email").notNull(),
    password: text("password").notNull(),
    createdAt: integer("created_at").default(sql `(cast (unixepoch () as int))`),
    updatedAt: integer("updated_at").default(sql `(cast (unixepoch () as int))`),
}, (users) => ({
    emailIdx: uniqueIndex("email_idx").on(users.email),
    emailPasswordIdx: uniqueIndex("email_password_idx").on(users.password),
    firstNameLastNameIdx: index("first_name_last_name_idx").on(users.firstName, users.lastName),
}));
export const todos = sqliteTable("todos", {
    id: text("id").primaryKey(),
    todo: text("todo").notNull(),
    completed: int("completed", { mode: "boolean" }).default(false),
    userId: text("user_id")
        .notNull()
        .references(() => users.id),
    createdAt: integer("created_at").default(sql `(cast (unixepoch () as int))`),
    updatedAt: integer("updated_at").default(sql `(cast (unixepoch () as int))`),
}, (todos) => ({
    userIdx: index("userId_idx").on(todos.userId),
    todoIdx: index("todo_idx").on(todos.todo),
}));
export const usersRelations = relations(users, ({ one, many }) => ({
    todos: many(todos),
}));
export const todosRelations = relations(todos, ({ one }) => ({
    user: one(users, {
        fields: [todos.userId],
        references: [users.id],
    }),
}));
//# sourceMappingURL=schema.js.map