import { useState } from "react";

import {
  COST_BASIS_METHODS,
  CRYPTO_NETWORKS,
} from "@/features/crypto/types/crypto";

import type {
  CostBasisMethod,
  CryptoNetwork,
} from "@/features/crypto/types/crypto";

type AddWalletFormValues = {
  symbol: string;
  name: string;
  network: CryptoNetwork | "";
  walletAddress: string;
  balance: string;
  costBasisMethod: CostBasisMethod;
};

type AddWalletFormProps = {
  onSubmit: (values: AddWalletFormValues) => void;
  onCancel: () => void;
};

/** Format a snake_case value for display */
function formatLabel(value: string): string {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Form for adding a new crypto asset or wallet
 */
function AddWalletForm({ onSubmit, onCancel }: AddWalletFormProps) {
  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [network, setNetwork] = useState<CryptoNetwork | "">("");
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [costBasisMethod, setCostBasisMethod] =
    useState<CostBasisMethod>("fifo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      symbol: symbol.toUpperCase(),
      name,
      network,
      walletAddress,
      balance,
      costBasisMethod,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Symbol */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="crypto-symbol" className="font-medium text-sm">
          Symbol
        </label>
        <input
          id="crypto-symbol"
          type="text"
          required
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="ETH"
          className="rounded-md border border-border bg-background px-3 py-2 font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="crypto-name" className="font-medium text-sm">
          Name
        </label>
        <input
          id="crypto-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ethereum"
          className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Network */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="crypto-network" className="font-medium text-sm">
          Network
        </label>
        <select
          id="crypto-network"
          value={network}
          onChange={(e) =>
            setNetwork(e.target.value as CryptoNetwork | "")
          }
          className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">Select network</option>
          {CRYPTO_NETWORKS.map((n) => (
            <option key={n} value={n}>
              {formatLabel(n)}
            </option>
          ))}
        </select>
      </div>

      {/* Wallet address */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="crypto-address" className="font-medium text-sm">
          Wallet address
          <span className="ml-1 font-normal text-muted-foreground">
            (optional)
          </span>
        </label>
        <input
          id="crypto-address"
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="0x..."
          className="rounded-md border border-border bg-background px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Balance */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="crypto-balance" className="font-medium text-sm">
          Balance
        </label>
        <input
          id="crypto-balance"
          type="text"
          inputMode="decimal"
          required
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          placeholder="0.00"
          className="rounded-md border border-border bg-background px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Cost basis method */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="crypto-method" className="font-medium text-sm">
          Cost basis method
        </label>
        <select
          id="crypto-method"
          value={costBasisMethod}
          onChange={(e) =>
            setCostBasisMethod(e.target.value as CostBasisMethod)
          }
          className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {COST_BASIS_METHODS.map((m) => (
            <option key={m} value={m}>
              {m.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Actions */}
      <div className="mt-2 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
        >
          Add Asset
        </button>
      </div>
    </form>
  );
}

export default AddWalletForm;
