import { GraphQLError } from "graphql";
import type { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { verifyJWT } from "../auth/utils";

export const graphqlMiddleware = (server: ApolloServer) =>
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      const token =
        (
          req.headers.authorization || (req.headers.Authorization as string)
        )?.split("Bearer ")[1] || (req.headers.token as string);

      try {
        const claim = await verifyJWT(token);
        const payload = claim.payload;

        if (!payload?.user) {
          throw Error("unauthenticated");
        }

        return payload;
      } catch (e) {
        console.error(e);
        res.send(401);
      }
    },
  });
