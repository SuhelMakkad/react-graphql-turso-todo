import { useQuery } from "@apollo/client";
import { gql } from "@/graphql/types";

const GET_TODOS = gql(/* GraphQL */ `
  query GetTodos {
    todos {
      id
      todo
      completed
    }
  }
`);

export const useTodosQuery = () => {
  return useQuery(GET_TODOS);
};
