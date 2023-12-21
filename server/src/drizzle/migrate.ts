import { migrate } from "drizzle-orm/libsql/migrator";
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

async function main() {
  try {
    await migrate(db, {
      migrationsFolder: "src/drizzle/migrations",
    });
    console.log("Tables migrated!");
  } catch (error) {
    console.error("Error performing migration: ", error);
    process.exit(1);
  }
}

main();
