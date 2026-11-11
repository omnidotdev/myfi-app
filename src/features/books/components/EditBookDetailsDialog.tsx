import { Loader2Icon } from "lucide-react";
import { useEffect, useId, useState } from "react";
import Dialog from "@/components/Dialog";
import type Book from "@/features/books/types/book";

/** Legal/filer details editable on a book (mirrors the 1099 filer form) */
export type BookDetails = {
  legalName: string;
  /** raw EIN; only sent when re-entered, blank keeps the stored value */
  ein: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
};

type EditBookDetailsDialogProps = {
  /** book being edited; also seeds the form. `null` keeps the dialog closed */
  book: Book | null;
  open: boolean;
  saving: boolean;
  onClose: () => void;
  onSubmit: (details: BookDetails) => void;
};

const EMPTY: BookDetails = {
  legalName: "",
  ein: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
};

/**
 * Dialog for editing a book's legal profile (legal name, EIN, address). These
 * print on invoices and feed 1099 e-filing. The EIN is stored masked, so the
 * field starts blank and only sends a value when the user types a new one
 */
function EditBookDetailsDialog({
  book,
  open,
  saving,
  onClose,
  onSubmit,
}: EditBookDetailsDialogProps) {
  const titleId = useId();
  const [details, setDetails] = useState<BookDetails>(EMPTY);

  // Seed from the book each time a different one is opened
  useEffect(() => {
    if (!book) return;
    setDetails({
      legalName: book.legalName ?? "",
      ein: "",
      address: book.address ?? "",
      city: book.city ?? "",
      state: book.state ?? "",
      zip: book.zip ?? "",
      phone: book.phone ?? "",
    });
  }, [book]);

  const update = (patch: Partial<BookDetails>) =>
    setDetails((d) => ({ ...d, ...patch }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      className="max-w-lg"
    >
      <h2 id={titleId} className="mb-1 font-semibold text-lg">
        Edit book details
      </h2>
      <p className="mb-4 text-muted-foreground text-sm">
        Legal details for {book?.name ?? "this book"}. These appear on invoices
        and 1099 filings.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            <span className="font-medium">Legal name</span>
            <input
              type="text"
              value={details.legalName}
              onChange={(e) => update({ legalName: e.target.value })}
              placeholder={book?.name ?? ""}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">
              EIN{" "}
              {book?.einMasked ? (
                <span className="font-mono font-normal text-muted-foreground text-xs">
                  (on file {book.einMasked})
                </span>
              ) : null}
            </span>
            <input
              type="text"
              value={details.ein}
              onChange={(e) => update({ ein: e.target.value })}
              placeholder={book?.einMasked ?? "12-3456789"}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">Phone</span>
            <input
              type="text"
              value={details.phone}
              onChange={(e) => update({ phone: e.target.value })}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            <span className="font-medium">Street address</span>
            <input
              type="text"
              value={details.address}
              onChange={(e) => update({ address: e.target.value })}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">City</span>
            <input
              type="text"
              value={details.city}
              onChange={(e) => update({ city: e.target.value })}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">State</span>
            <input
              type="text"
              value={details.state}
              onChange={(e) => update({ state: e.target.value })}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">ZIP</span>
            <input
              type="text"
              value={details.zip}
              onChange={(e) => update({ zip: e.target.value })}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </label>
        </div>

        <div className="mt-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {saving && <Loader2Icon className="size-4 animate-spin" />}
            Save details
          </button>
        </div>
      </form>
    </Dialog>
  );
}

export default EditBookDetailsDialog;
