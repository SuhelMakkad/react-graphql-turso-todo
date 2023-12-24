import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const graphqlUrl =
  import.meta.env.VITE_ENV === "dev"
    ? "http://localhost:8000/graphql"
    : "https://react-graphql-turso-todo.vercel.app/graphql";

console.log(import.meta.env.VITE_ENV);
console.log(graphqlUrl);

export const apolloClient = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache(),
});

export const ApolloGraphqlProvider = ({
  children,
}: React.PropsWithChildren) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
