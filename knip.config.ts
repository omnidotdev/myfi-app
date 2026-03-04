import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: [
    "src/routes/**/*.{ts,tsx}",
    "src/router.tsx",
    "src/lib/graphql/graphqlFetch.ts",
    "src/components/**/*.{ts,tsx}",
    "src/lib/**/*.{ts,tsx}",
    "src/features/**/*.{ts,tsx}",
  ],
  project: ["src/**/*.{ts,tsx,css}"],
  ignore: ["src/generated/**", "src/routeTree.gen.ts"],
  graphqlCodegen: {
    config: ["package.json", "src/lib/graphql/codegen.config.ts"],
  },
  ignoreExportsUsedInFile: true,
  ignoreDependencies: [
    // UI - not yet used, planned
    "@internationalized/date",
    "@tanstack/react-form",
    "@tanstack/zod-adapter",
    "dayjs",
    "sonner",
    // Utils - not yet used, planned
    "jose",
    "ms",
    "ts-pattern",
    "usehooks-ts",
    "zod",
    // Codegen input
    "dotenv",
    // Dev tools
    "@graphql-codegen/import-types-preset",
    "@tanstack/react-devtools",
    "@tanstack/react-query-devtools",
    "@tanstack/react-router-devtools",
    "tw-animate-css",
  ],
};

export default config;
