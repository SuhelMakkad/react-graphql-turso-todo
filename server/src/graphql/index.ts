import { expressMiddleware } from "@apollo/server/express4";
import { verifyJWT } from "../auth/utils";
import type { ApolloServer } from "@apollo/server";

export const graphqlMiddleware = (server: ApolloServer) =>
  expressMiddleware(server, {
    context: async ({ req }) => {
      const token =
        req.headers.authorization?.split("Bearer")[0] ||
        (req.headers.token as string);

      try {
        const claim = await verifyJWT(token);
        return claim.payload;
      } catch (e) {
        console.error(e);
        return;
      }
    },
  });
