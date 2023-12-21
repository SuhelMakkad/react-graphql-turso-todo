import { useMutation } from "@apollo/client";
import { gql } from "@/graphql/types";

const DELETE_TODO = gql(/* GraphQL */ `
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`);

export const useDeleteTodoMutation = () => {
  return useMutation(DELETE_TODO);
};
