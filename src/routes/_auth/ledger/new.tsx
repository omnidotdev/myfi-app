import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { Account } from "@/features/accounts/types/account";
import JournalEntryForm from "@/features/ledger/components/JournalEntryForm";

export const Route = createFileRoute("/_auth/ledger/new")({
  component: NewJournalEntryPage,
});

function NewJournalEntryPage() {
  const navigate = useNavigate();

  // Will be replaced with real account data from GraphQL
  const [accounts] = useState<Account[]>([]);

  const handleSubmit = (_entry: {
    date: string;
    memo: string;
    lines: { accountId: string; debit: string; credit: string; memo: string }[];
  }) => {
    navigate({ to: "/ledger" });
  };

  const handleCancel = () => {
    navigate({ to: "/ledger" });
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="font-bold text-2xl">New Journal Entry</h1>
        <p className="text-muted-foreground text-sm">
          Create a balanced double-entry journal entry
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <JournalEntryForm
          accounts={accounts}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
