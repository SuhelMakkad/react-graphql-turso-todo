import { useMutation } from "@apollo/client";
import { gql } from "@/graphql/types";

const ADD_USER = gql(/* GraphQL */ `
  mutation AddUser($email: String!, $firstName: String, $lastName: String) {
    addUser(email: $email, firstName: $firstName, lastName: $lastName)
  }
`);

export const useAddUserMutation = () => {
  return useMutation(ADD_USER);
};
