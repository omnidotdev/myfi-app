import { InfoIcon } from "lucide-react";

/**
 * Shown on MyFi's native invoicing/quotes/inventory pages when the active book's
 * source of record is Mantle. In that mode Mantle owns these records and MyFi
 * only reflects the accounting, so native creation is disabled
 */
function MantleManagedBanner({ noun }: { noun: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4">
      <InfoIcon className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
      <div className="flex flex-col gap-0.5">
        <span className="font-medium text-sm">Managed in Mantle</span>
        <span className="text-muted-foreground text-sm">
          This book's {noun} are managed in Mantle. MyFi records the accounting
          automatically from Mantle; create and edit {noun} in Mantle.
        </span>
      </div>
    </div>
  );
}

export default MantleManagedBanner;
