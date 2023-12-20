import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema";
import { todos, users } from "./data";

const resolvers = {
  Query: {
    todos: (_parent, args, _context) => {
      return todos.filter((todo) => todo.userId === +args.userId);
    },
  },
  Todo: {
    user: (parent) => {
      return users.find((user) => user.id === parent.userId);
    },
  },
  User: {
    todos: (parent) => {
      return todos.filter((todo) => todo.userId === parent.id);
    },
  },
  Mutation: {
    addTodo: (_parent, args, _context) => {
      const id = Date.now();

      todos.push({
        id,
        todo: args.todo,
        completed: args.completed,
        userId: 1,
      });

      return todos;
    },

    deleteTodo: (_parent, args, _context) => {
      const index = todos.findIndex((todo) => todo.id === +args.id);
      if (index >= 0) {
        todos.splice(index, 1);
      }

      return todos;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
