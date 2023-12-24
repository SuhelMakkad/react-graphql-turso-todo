import express from "express";
import { expressjwt } from "express-jwt";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { authRouter } from "./auth";

const app = express();
const PORT = Number(process.env.PORT) || 8000;

const gqlServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await gqlServer.start().catch(console.error);

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/graphql", expressMiddleware(gqlServer));
app.use(
  expressjwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);

app.use("/auth", authRouter);

app.get("/", (req, res) => res.json({ message: "Running" }));

app.listen(PORT, () => {
  console.log(`🚀 started the server on ${PORT}`);
});

export { app };
