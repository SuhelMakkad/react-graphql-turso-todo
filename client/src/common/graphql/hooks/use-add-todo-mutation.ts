import { useMutation } from "@apollo/client";
import { gql } from "@/graphql/types";

const ADD_TODO = gql(/* GraphQL */ `
  mutation AddTodo($todo: String!, $completed: Boolean) {
    addTodo(todo: $todo, completed: $completed) {
      id
    }
  }
`);

export const useAddTodoMutation = () => {
  return useMutation(ADD_TODO);
};
