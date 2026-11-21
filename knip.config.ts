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
  // NB: point knip at the codegen config so it resolves plugins referenced as
  // strings, see: https://knip.dev/reference/plugins/graphql-codegen
  "graphql-codegen": {
    config: ["package.json", "src/lib/graphql/codegen.config.ts"],
  },
  ignore: ["src/generated/**"],
  ignoreExportsUsedInFile: true,
  ignoreDependencies: [
    // UI - not yet used, planned
    "@internationalized/date",
    "@tanstack/react-form",
    "@tanstack/zod-adapter",
    "dayjs",
    // Utils - not yet used, planned
    "jose",
    "ms",
    "ts-pattern",
    // Dev tools
    "@graphql-codegen/import-types-preset",
    "@tanstack/react-devtools",
    "@tanstack/react-query-devtools",
    "@tanstack/react-router-devtools",
    "tw-animate-css",
    // Types only: Thornberry's published declarations import `VariantProps`
    // from it, so without it component props resolve to `any`
    "class-variance-authority",
  ],
};

export default config;
