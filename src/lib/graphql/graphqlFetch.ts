import { parse } from "graphql";
import { GraphQLClient, gql } from "graphql-request";

import { API_GRAPHQL_URL } from "@/lib/config/env.config";
import { fetchSession } from "@/server/functions/auth";

import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { Variables } from "graphql-request";

type FetchOptions = {
  cache?: RequestCache;
};

export const graphqlFetch =
  <TData, TVariables>(
    query: string,
    variables?: TVariables,
    options?: (HeadersInit & FetchOptions) | FetchOptions,
  ) =>
  async (): Promise<TData> => {
    const { session } = await fetchSession();
    const accessToken = session?.accessToken;

    const { cache, ...restOptions } = options || {};

    const client = new GraphQLClient(API_GRAPHQL_URL, {
      cache,
    });

    const document: TypedDocumentNode<TData, Variables> = parse(gql`${query}`);

    return client.request({
      document,
      variables: variables as Variables,
      requestHeaders: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...restOptions,
      },
    });
  };
