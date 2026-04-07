import { SaveIcon } from "lucide-react";
import { useCallback, useState } from "react";

import type { Account } from "@/features/accounts/types/account";

/** Event types supported for account mapping */
const EVENT_TYPES = [
  // Plaid auto-categorization
  {
    type: "plaid_income",
    description: "Default income categorization",
  },
  {
    type: "plaid_expense",
    description: "Default expense categorization",
  },
  // Mantle events
  {
    type: "invoice.sent",
    description: "Record receivable",
  },
  {
    type: "invoice.paid",
    description: "Record payment",
  },
  {
    type: "invoice.void",
    description: "Reverse receivable",
  },
  {
    type: "inventory.adjustment",
    description: "Record cost",
  },
  // Payroll
  {
    type: "payroll_gross_wages",
    description: "Gross wages expense",
  },
  {
    type: "payroll_employer_tax",
    description: "Employer tax expense",
  },
  {
    type: "payroll_net_pay",
    description: "Net pay disbursement",
  },
  {
    type: "payroll_employee_tax",
    description: "Employee tax withheld",
  },
  {
    type: "payroll_benefits",
    description: "Benefits deductions",
  },
] as const;

type EventType = (typeof EVENT_TYPES)[number]["type"];

type AccountMapping = {
  rowId: string;
  eventType: string;
  debitAccountId: string | null;
  creditAccountId: string | null;
};

type RowState = {
  debitAccountId: string;
  creditAccountId: string;
};

type AccountMappingFormProps = {
  accounts: Account[];
  mappings: AccountMapping[];
  onSave: (
    eventType: string,
    debitAccountId: string,
    creditAccountId: string,
  ) => void;
};

/** Find an existing mapping for the given event type */
function findMapping(
  mappings: AccountMapping[],
  eventType: string,
): AccountMapping | undefined {
  return mappings.find((m) => m.eventType === eventType);
}

/** Build initial row state from existing mappings */
function buildInitialState(
  mappings: AccountMapping[],
): Record<EventType, RowState> {
  const state = {} as Record<EventType, RowState>;

  for (const { type } of EVENT_TYPES) {
    const mapping = findMapping(mappings, type);
    state[type] = {
      debitAccountId: mapping?.debitAccountId ?? "",
      creditAccountId: mapping?.creditAccountId ?? "",
    };
  }

  return state;
}

/**
 * Table form for mapping Mantle event types to debit/credit accounts
 */
function AccountMappingForm({
  accounts,
  mappings,
  onSave,
}: AccountMappingFormProps) {
  const [rows, setRows] = useState(() => buildInitialState(mappings));

  const activeAccounts = accounts.filter((a) => a.isActive && !a.isPlaceholder);

  const handleChange = useCallback(
    (eventType: EventType, field: keyof RowState, value: string) => {
      setRows((prev) => ({
        ...prev,
        [eventType]: {
          ...prev[eventType],
          [field]: value,
        },
      }));
    },
    [],
  );

  const handleSave = useCallback(
    (eventType: EventType) => {
      const row = rows[eventType];
      if (!row.debitAccountId || !row.creditAccountId) return;
      onSave(eventType, row.debitAccountId, row.creditAccountId);
    },
    [rows, onSave],
  );

  return (
    <div className="rounded-lg border border-border bg-card">
      {/* Header */}
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] items-center gap-4 border-border border-b px-4 py-3 font-medium text-muted-foreground text-xs">
        <span>Event Type</span>
        <span>Description</span>
        <span>Debit Account</span>
        <span>Credit Account</span>
        <span className="w-9" />
      </div>

      {/* Rows */}
      {EVENT_TYPES.map(({ type, description }) => {
        const row = rows[type];
        const canSave = row.debitAccountId && row.creditAccountId;
        const existing = findMapping(mappings, type);
        const isDirty =
          row.debitAccountId !== (existing?.debitAccountId ?? "") ||
          row.creditAccountId !== (existing?.creditAccountId ?? "");

        return (
          <div
            key={type}
            className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] items-center gap-4 border-border border-b px-4 py-3 last:border-b-0"
          >
            {/* Event type */}
            <span className="font-mono text-sm">{type}</span>

            {/* Description */}
            <span className="text-muted-foreground text-sm">{description}</span>

            {/* Debit account picker */}
            <select
              value={row.debitAccountId}
              onChange={(e) =>
                handleChange(type, "debitAccountId", e.target.value)
              }
              aria-label={`Debit account for ${type}`}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Select account</option>
              {activeAccounts.map((a) => (
                <option key={a.rowId} value={a.rowId}>
                  {a.code} - {a.name}
                </option>
              ))}
            </select>

            {/* Credit account picker */}
            <select
              value={row.creditAccountId}
              onChange={(e) =>
                handleChange(type, "creditAccountId", e.target.value)
              }
              aria-label={`Credit account for ${type}`}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Select account</option>
              {activeAccounts.map((a) => (
                <option key={a.rowId} value={a.rowId}>
                  {a.code} - {a.name}
                </option>
              ))}
            </select>

            {/* Save button */}
            <button
              type="button"
              onClick={() => handleSave(type)}
              disabled={!canSave || !isDirty}
              aria-label={`Save mapping for ${type}`}
              className="inline-flex size-9 items-center justify-center rounded-md text-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
            >
              <SaveIcon className="size-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default AccountMappingForm;
