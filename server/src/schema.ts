export const typeDefs = `#graphql
    type Todo {
        id: ID!
        todo: String!
        completed: Boolean
        userId: String!
        user: User!
    }

    type User {
        id: ID!
        email: String!
        todos: [Todo!]
    }

    type Query {
        todos(userId: ID!): [Todo]
        users: [User]
    }

    type Mutation {
        addTodo(todo: String!, completed: Boolean): [Todo!]
        deleteTodo(id: ID!): [Todo!]
    }
`;
