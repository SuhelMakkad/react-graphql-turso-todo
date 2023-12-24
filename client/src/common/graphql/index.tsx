import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const graphqlUrl = import.meta.env.PROD
  ? "https://react-graphql-turso-todo.vercel.app/graphql"
  : "http://localhost:8000/graphql";

export const apolloClient = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache(),
});

export const ApolloGraphqlProvider = ({
  children,
}: React.PropsWithChildren) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
