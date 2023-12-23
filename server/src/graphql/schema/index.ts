import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filepath = path.resolve(__dirname, "./schema.graphql");
export const typeDefs = readFileSync(filepath, {
  encoding: "utf-8",
});
