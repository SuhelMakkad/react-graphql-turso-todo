import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./graphql/schema/index.js";
import { resolvers } from "./graphql/resolvers.js";
import { authRouter } from "./auth/index.js";
import { graphqlMiddleware } from "./graphql/index.js";
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
app.use("/graphql", graphqlMiddleware(gqlServer));
app.use("/auth", authRouter);
app.get("/", (req, res) => res.json({ message: "Running" }));
app.listen(PORT, () => {
    console.log(`🚀 started the server on ${PORT}`);
});
export { app };
//# sourceMappingURL=index.js.map