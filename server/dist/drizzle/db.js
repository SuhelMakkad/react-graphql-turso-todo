import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import "dotenv/config";
import * as schema from "./schema";
const dbUrl = process.env.TURSO_DB_URL;
const dbAuthToken = process.env.TURSO_DB_AUTH_TOKEN;
if (!dbUrl || !dbAuthToken) {
    throw Error("Database credentials are missing");
}
export const client = createClient({
    url: dbUrl,
    authToken: dbAuthToken,
});
export const db = drizzle(client, { schema });
//# sourceMappingURL=db.js.map