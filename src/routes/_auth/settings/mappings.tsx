import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";

import AccountMappingForm from "@/features/settings/components/AccountMappingForm";

import type { Account } from "@/features/accounts/types/account";

export const Route = createFileRoute("/_auth/settings/mappings")({
  component: MappingsSettingsPage,
});

// Placeholder data until GraphQL is wired up
const EMPTY_ACCOUNTS: Account[] = [];
const EMPTY_MAPPINGS: { rowId: string; eventType: string; debitAccountId: string | null; creditAccountId: string | null }[] = [];

function MappingsSettingsPage() {
  const [accounts] = useState<Account[]>(EMPTY_ACCOUNTS);
  const [mappings] = useState(EMPTY_MAPPINGS);

  // Placeholder bookId -- will be replaced with real book picker
  const [_bookId, _setBookId] = useState("default");

  const handleSave = useCallback(
    (eventType: string, debitAccountId: string, creditAccountId: string) => {
      // TODO: wire to UpsertAccountMapping mutation
      console.info("Save mapping:", { eventType, debitAccountId, creditAccountId });
    },
    [],
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="font-bold text-2xl">Account Mappings</h1>
        <p className="text-muted-foreground text-sm">
          Map Mantle event types to debit and credit accounts for automatic
          journal entry creation
        </p>
      </div>

      {/* Book picker placeholder */}
      <div className="flex items-center gap-3">
        <label htmlFor="mapping-book" className="font-medium text-sm">
          Book
        </label>
        <select
          id="mapping-book"
          className="rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          disabled
        >
          <option>Select a book</option>
        </select>
      </div>

      <AccountMappingForm
        accounts={accounts}
        mappings={mappings}
        onSave={handleSave}
      />
    </div>
  );
}
