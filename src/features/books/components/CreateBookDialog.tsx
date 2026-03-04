import { useState } from "react";

import { BOOK_TYPES } from "@/features/books/types/book";

import type { BookType } from "@/features/books/types/book";

const TEMPLATES = ["none", "personal", "sole_proprietor", "llc"] as const;
type Template = (typeof TEMPLATES)[number];

const TEMPLATE_LABELS: Record<Template, string> = {
  none: "None",
  personal: "Personal",
  sole_proprietor: "Sole Proprietor",
  llc: "LLC",
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type CreateBookDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    type: BookType;
    currency: string;
    fiscalYearStartMonth: number;
    template: Template;
  }) => void;
};

/**
 * Dialog for creating a new book
 */
function CreateBookDialog({ open, onClose, onSubmit }: CreateBookDialogProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<BookType>("personal");
  const [currency, setCurrency] = useState("USD");
  const [fiscalYearStartMonth, setFiscalYearStartMonth] = useState(1);
  const [template, setTemplate] = useState<Template>("none");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, type, currency, fiscalYearStartMonth, template });
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setType("personal");
    setCurrency("USD");
    setFiscalYearStartMonth(1);
    setTemplate("none");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
        aria-label="Close dialog"
      />

      {/* Dialog */}
      <div className="relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
        <h2 className="mb-4 font-semibold text-lg">Create Book</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="book-name" className="font-medium text-sm">
              Name
            </label>
            <input
              id="book-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Finances"
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Type */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="book-type" className="font-medium text-sm">
              Type
            </label>
            <select
              id="book-type"
              value={type}
              onChange={(e) => setType(e.target.value as BookType)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {BOOK_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Currency */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="book-currency" className="font-medium text-sm">
              Currency
            </label>
            <input
              id="book-currency"
              type="text"
              required
              value={currency}
              onChange={(e) => setCurrency(e.target.value.toUpperCase())}
              maxLength={3}
              placeholder="USD"
              className="rounded-md border border-border bg-background px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Fiscal year start month */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="book-fiscal-month"
              className="font-medium text-sm"
            >
              Fiscal year start
            </label>
            <select
              id="book-fiscal-month"
              value={fiscalYearStartMonth}
              onChange={(e) => setFiscalYearStartMonth(Number(e.target.value))}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {MONTHS.map((month, idx) => (
                <option key={month} value={idx + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Template */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="book-template" className="font-medium text-sm">
              Template
            </label>
            <select
              id="book-template"
              value={template}
              onChange={(e) => setTemplate(e.target.value as Template)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {TEMPLATES.map((t) => (
                <option key={t} value={t}>
                  {TEMPLATE_LABELS[t]}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBookDialog;
