import { useMutation } from "@apollo/client";
import { gql } from "@/graphql/types";

const UPDATE_TODO = gql(/* GraphQL */ `
  mutation UPDATE_TODO($id: ID!, $completed: Boolean!) {
    updateTodoStatus(id: $id, completed: $completed)
  }
`);

export const useUpdateTodoMutation = () => {
  return useMutation(UPDATE_TODO);
};
