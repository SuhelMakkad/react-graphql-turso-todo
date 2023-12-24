import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const graphqlUrl =
  import.meta.env.VITE_ENV === "dev"
    ? "http://localhost:8000/graphql"
    : "https://react-graphql-turso-todo.vercel.app/graphql";

export const apolloClient = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache(),
});

export const ApolloGraphqlProvider = ({
  children,
}: React.PropsWithChildren) => {
  console.log(import.meta.env.VITE_ENV);
  console.log(graphqlUrl);
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
