import type { CodegenConfig } from "@graphql-codegen/cli";
import type { Types } from "@graphql-codegen/plugin-helpers";

const API_URL = process.env.VITE_API_URL ?? "https://localhost:4000";
const API_GRAPHQL_URL = process.env.GRAPHQL_SCHEMA_PATH
  ? process.env.GRAPHQL_SCHEMA_PATH
  : `${API_URL}/graphql`;

type GraphQLCodegenConfig = Types.ConfiguredOutput;

const sharedPlugins: GraphQLCodegenConfig["plugins"] = [
  "typescript",
  "typescript-operations",
  {
    add: {
      content: "// @ts-nocheck",
    },
  },
];

const sharedConfig: GraphQLCodegenConfig["config"] = {
  scalars: {
    Date: { input: "Date", output: "string" },
    Datetime: { input: "Date", output: "string" },
    UUID: "string",
    Cursor: "string",
    BigInt: "string",
    BigFloat: "string",
  },
  defaultScalarType: "unknown",
  constEnum: true,
};

const graphqlCodegenConfig: CodegenConfig = {
  schema: API_GRAPHQL_URL,
  documents: "src/lib/graphql/**/*.graphql",
  ignoreNoDocuments: true,
  config: {
    sort: true,
  },
  generates: {
    "src/generated/graphql.sdk.ts": {
      plugins: [...sharedPlugins, "typescript-graphql-request"],
      config: sharedConfig,
    },
    "src/generated/graphql.ts": {
      plugins: [...sharedPlugins, "typescript-react-query"],
      config: {
        ...sharedConfig,
        reactQueryVersion: 5,
        addInfiniteQuery: true,
        addSuspenseQuery: true,
        exposeQueryKeys: true,
        exposeMutationKeys: true,
        exposeFetcher: true,
        fetcher: {
          func: "@/lib/graphql/graphqlFetch#graphqlFetch",
        },
      },
    },
  },
};

export default graphqlCodegenConfig;
