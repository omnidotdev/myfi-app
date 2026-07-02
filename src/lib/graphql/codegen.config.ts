import type { CodegenConfig } from "@graphql-codegen/cli";
import type { Types } from "@graphql-codegen/plugin-helpers";

type GraphQLCodegenConfig = Types.ConfiguredOutput;

// offline schema source: the API's committed SDL, generated from the database
// (no running server or introspection needed). Override with GRAPHQL_SCHEMA_URL
// to point at a live endpoint if ever required
const LOCAL_SCHEMA_PATH = "../myfi-api/src/generated/graphql/schema.graphql";

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
  schema: process.env.GRAPHQL_SCHEMA_URL || LOCAL_SCHEMA_PATH,
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
