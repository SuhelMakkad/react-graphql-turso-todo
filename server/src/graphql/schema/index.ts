import { readFileSync } from "fs";

export const typeDefs = readFileSync("./src/graphql/schema/schema.graphql", {
  encoding: "utf-8",
});
