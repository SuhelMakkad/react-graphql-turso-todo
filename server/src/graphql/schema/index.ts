import { readFileSync } from "fs";

let filepath = "./graphql/schema/schema.graphql";
if (process.env.ENV === "dev") {
  filepath = "./src/graphql/schema/schema.graphql";
}

export const typeDefs = readFileSync(filepath, {
  encoding: "utf-8",
});
