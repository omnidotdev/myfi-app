import { Loader2Icon } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api/apiFetch";

type Props = {
  bookId: string;
};

/**
 * Start the QuickBooks OAuth flow
 * The connect endpoint returns an authUrl to redirect the browser to
 */
function QuickBooksConnectButton({ bookId }: Props) {
  const [connecting, setConnecting] = useState(false);

  const handleConnect = useCallback(async () => {
    if (!bookId) return;

    setConnecting(true);

    try {
      const res = await apiFetch(`/api/quickbooks/connect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });

      const data = await res.json();

      if (!res.ok || !data.authUrl) {
        throw new Error("missing authUrl");
      }

      window.location.href = data.authUrl;
    } catch {
      toast.error("Failed to start QuickBooks connection");
      setConnecting(false);
    }
  }, [bookId]);

  return (
    <button
      type="button"
      onClick={handleConnect}
      disabled={connecting || !bookId}
      className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
    >
      {connecting && <Loader2Icon className="size-4 animate-spin" />}
      Connect QuickBooks
    </button>
  );
}

export default QuickBooksConnectButton;
