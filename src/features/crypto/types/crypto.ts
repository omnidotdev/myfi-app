export const CRYPTO_NETWORKS = [
  "ethereum",
  "bitcoin",
  "solana",
  "polygon",
  "arbitrum",
  "base",
  "avalanche",
] as const;
export type CryptoNetwork = (typeof CRYPTO_NETWORKS)[number];

export const COST_BASIS_METHODS = ["fifo", "lifo", "hifo", "acb"] as const;
export type CostBasisMethod = (typeof COST_BASIS_METHODS)[number];

export type CryptoAsset = {
  rowId: string;
  bookId: string;
  symbol: string;
  name: string;
  walletAddress: string | null;
  network: CryptoNetwork | null;
  balance: string;
  costBasisMethod: CostBasisMethod;
  lastSyncedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CryptoLot = {
  rowId: string;
  cryptoAssetId: string;
  quantity: string;
  costPerUnit: string;
  costBasis: string;
  remainingQuantity: string;
  acquiredAt: string;
  disposedAt: string | null;
  proceedsPerUnit: string | null;
  realizedGainLoss: string | null;
};

export default CryptoAsset;
