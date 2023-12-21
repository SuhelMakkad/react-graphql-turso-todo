import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8000/graphql",
  documents: ["src/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/common/graphql/types/": {
      preset: "client",
      plugins: ["typescript-operations", "typescript-react-apollo"],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;
