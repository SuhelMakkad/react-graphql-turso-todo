import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const graphqlUrl = "http://localhost:8000/graphql";

const apolloClient = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache(),
});

export const ApolloGraphqlProvider = ({
  children,
}: React.PropsWithChildren) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
