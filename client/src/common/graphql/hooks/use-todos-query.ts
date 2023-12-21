import { useQuery } from "@apollo/client";
import { gql } from "../types";

const GET_TODOS = gql(/* GraphQL */ `
  query GetTodos($userId: ID!) {
    todos(userId: $userId) {
      id
      todo
      completed
    }
  }
`);

export const useTodosQuery = () => {
  return useQuery(GET_TODOS, {
    variables: {
      userId: "1703165024039",
    },
  });
};
