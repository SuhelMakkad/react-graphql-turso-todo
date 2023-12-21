import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { typeDefs } from "./schema";

const app = express();
const PORT = Number(process.env.PORT) || 8000;

const gqlServer = new ApolloServer({
  typeDefs,
  resolvers: {},
});

await gqlServer.start();

app.use(express.json());
app.use("/graphql", expressMiddleware(gqlServer));

app.get("/", (req, res) => {
  res.json({ message: "Running" });
});

app.listen(PORT, () => console.log(`🚀 started the server on ${PORT}`));