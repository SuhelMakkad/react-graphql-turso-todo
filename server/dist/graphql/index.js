import { expressMiddleware } from "@apollo/server/express4";
import { verifyJWT } from "../auth/utils.js";
export const graphqlMiddleware = (server) => expressMiddleware(server, {
    context: async ({ req, res }) => {
        const token = (req.headers.authorization || req.headers.Authorization)?.split("Bearer ")[1] || req.headers.token;
        try {
            const claim = await verifyJWT(token);
            const payload = claim.payload;
            if (!payload?.user) {
                throw Error("unauthenticated");
            }
            return payload;
        }
        catch (e) {
            console.error(e);
            res.send(401);
        }
    },
});
//# sourceMappingURL=index.js.map