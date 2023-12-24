import { expressMiddleware } from "@apollo/server/express4";
import { verifyJWT } from "../auth/utils.js";
export const graphqlMiddleware = (server) => expressMiddleware(server, {
    context: async ({ req }) => {
        const token = req.headers.authorization?.split("Bearer")[0] ||
            req.headers.token;
        try {
            const claim = await verifyJWT(token);
            return claim.payload;
        }
        catch (e) {
            console.error(e);
            return;
        }
    },
});
//# sourceMappingURL=index.js.map