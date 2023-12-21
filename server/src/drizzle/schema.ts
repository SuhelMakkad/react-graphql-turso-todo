import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  real,
  sqliteTable,
  text,
  uniqueIndex,
  int,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    firstName: text("firstName"),
    lastName: text("lastName"),
    email: text("email").notNull(),
    createdAt: integer("created_at").default(sql`(cast (unixepoch () as int))`),
    updatedAt: integer("updated_at").default(sql`(cast (unixepoch () as int))`),
  },
  (users) => ({
    emailIdx: uniqueIndex("email_idx").on(users.email),
    firstNameLastNameIdx: index("first_name_last_name_idx").on(
      users.firstName,
      users.lastName
    ),
  })
);

export const passwords = sqliteTable("passwords", {
  hash: text("hash").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export const todos = sqliteTable(
  "todos",
  {
    id: text("id").primaryKey(),
    todo: text("todo").notNull(),
    completed: int("completed", { mode: "boolean" }).default(false),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    createdAt: integer("created_at").default(sql`(cast (unixepoch () as int))`),
    updatedAt: integer("updated_at").default(sql`(cast (unixepoch () as int))`),
  },
  (todos) => ({
    userIdx: index("userId_idx").on(todos.userId),
    todoIdx: index("todo_idx").on(todos.todo),
  })
);

export const usersRelations = relations(users, ({ one, many }) => ({
  password: one(passwords, {
    fields: [users.id],
    references: [passwords.userId],
  }),
  todos: many(todos),
}));

export const passwordsRelations = relations(passwords, ({ one }) => ({
  user: one(users, {
    fields: [passwords.userId],
    references: [users.id],
  }),
}));

export const todosRelations = relations(todos, ({ one }) => ({
  user: one(users, {
    fields: [todos.userId],
    references: [users.id],
  }),
}));
