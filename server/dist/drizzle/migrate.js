import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "./db.js";
async function main() {
    try {
        await migrate(db, {
            migrationsFolder: "src/drizzle/migrations",
        });
        console.log("Tables migrated!");
    }
    catch (error) {
        console.error("Error performing migration: ", error);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=migrate.js.map