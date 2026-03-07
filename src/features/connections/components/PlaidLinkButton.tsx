import { useCallback, useEffect, useState } from "react";
import type { PlaidLinkOnSuccessMetadata } from "react-plaid-link";
import { usePlaidLink } from "react-plaid-link";
import { API_URL } from "@/lib/config/env.config";

type Props = {
  bookId: string;
  userId: string;
  onSuccess: () => void;
};

/**
 * Open the Plaid Link flow to connect a bank account
 */
function PlaidLinkButton({ bookId, userId, onSuccess }: Props) {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [isExchanging, setIsExchanging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch a link token when bookId changes
  useEffect(() => {
    let cancelled = false;

    async function fetchLinkToken() {
      if (!cancelled) setError(null);

      try {
        const res = await fetch(`${API_URL}/api/plaid/create-link-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookId, userId }),
        });

        const data = await res.json();
        if (!cancelled) setLinkToken(data.linkToken);
      } catch {
        if (!cancelled) setError("Failed to initialize bank connection");
      }
    }

    setLinkToken(null);
    fetchLinkToken();

    return () => {
      cancelled = true;
    };
  }, [bookId, userId]);

  const handlePlaidSuccess = useCallback(
    async (publicToken: string, metadata: PlaidLinkOnSuccessMetadata) => {
      setIsExchanging(true);

      try {
        const exchangeRes = await fetch(`${API_URL}/api/plaid/exchange-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            publicToken,
            bookId,
            institutionName: metadata.institution?.name,
            accountMask: metadata.accounts?.[0]?.mask,
          }),
        });

        const { connectedAccountId } = await exchangeRes.json();

        // Trigger initial sync with the correct ID
        await fetch(`${API_URL}/api/plaid/sync`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ connectedAccountId }),
        });

        onSuccess();
      } finally {
        setIsExchanging(false);
      }
    },
    [bookId, onSuccess],
  );

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: handlePlaidSuccess,
  });

  const isLoading = !linkToken || isExchanging;

  return (
    <div>
      <button
        type="button"
        onClick={() => open()}
        disabled={!ready || isLoading}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Loading..." : "Connect Bank Account"}
      </button>
      {error && <p className="mt-2 text-destructive text-sm">{error}</p>}
    </div>
  );
}

export default PlaidLinkButton;
