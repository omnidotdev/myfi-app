export const CONNECTED_ACCOUNT_PROVIDERS = [
  "plaid",
  "coinbase",
  "kraken",
  "manual",
] as const;
export type ConnectedAccountProvider =
  (typeof CONNECTED_ACCOUNT_PROVIDERS)[number];

export const CONNECTED_ACCOUNT_STATUSES = [
  "active",
  "inactive",
  "error",
  "reauth_required",
] as const;
export type ConnectedAccountStatus =
  (typeof CONNECTED_ACCOUNT_STATUSES)[number];

export type ConnectedAccount = {
  rowId: string;
  bookId: string;
  provider: ConnectedAccountProvider;
  providerAccountId: string | null;
  accountId: string | null;
  institutionName: string | null;
  mask: string | null;
  accessToken: string;
  status: ConnectedAccountStatus;
  lastSyncedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export default ConnectedAccount;
