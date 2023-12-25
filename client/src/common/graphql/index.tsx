import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
  type ServerError,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { apiBaseUrl, routes } from "@/utils/route";
import { useJWTStore } from "../store/jwt";

const graphqlUrl = `${apiBaseUrl}/graphql`;

const httpLink = createHttpLink({
  uri: graphqlUrl,
});

const authLink = setContext((_, { headers }) => {
  const token = useJWTStore.getState().jwt;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);

  // unauthorized
  const status = (networkError as ServerError).response.status;
  if (status === 401) {
    window.location.href = routes.login + "?error=Please login to continue";
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export const ApolloGraphqlProvider = ({
  children,
}: React.PropsWithChildren) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
