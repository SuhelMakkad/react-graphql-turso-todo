import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

const app = express();
const PORT = Number(process.env.PORT) || 8000;

const gqlServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await gqlServer.start().catch(console.error);

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/graphql", expressMiddleware(gqlServer));

app.get("/", (req, res) => {
  res.json({ message: "Running" });
});

export { app };

app.listen(PORT, () => {
  console.log(`🚀 started the server on ${PORT}`);
});
