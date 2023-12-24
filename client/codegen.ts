import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../server/src/graphql/schema/schema.graphql",
  documents: ["src/**/!(*.d).{ts,tsx}", "src/**/*/!(*.d).{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./src/common/graphql/types/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;
