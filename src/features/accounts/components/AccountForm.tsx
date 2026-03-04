import { useState } from "react";
import type {
  Account,
  AccountSubType,
  AccountType,
} from "@/features/accounts/types/account";
import {
  ACCOUNT_TYPES,
  SUB_TYPES_BY_TYPE,
} from "@/features/accounts/types/account";
import formatLabel from "@/lib/format/label";

type AccountFormProps = {
  accounts: Account[];
  initialValues?: Partial<Account>;
  onSubmit: (values: Partial<Account>) => void;
  onCancel: () => void;
};

/**
 * Form for creating or editing an account
 */
function AccountForm({
  accounts,
  initialValues,
  onSubmit,
  onCancel,
}: AccountFormProps) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [code, setCode] = useState(initialValues?.code ?? "");
  const [type, setType] = useState<AccountType>(initialValues?.type ?? "asset");
  const [subType, setSubType] = useState<AccountSubType | "">(
    initialValues?.subType ?? "",
  );
  const [parentId, setParentId] = useState<string>(
    initialValues?.parentId ?? "",
  );
  const [isPlaceholder, setIsPlaceholder] = useState(
    initialValues?.isPlaceholder ?? false,
  );

  const availableSubTypes = SUB_TYPES_BY_TYPE[type];

  // Reset sub-type when switching to a type that doesn't include current selection
  const handleTypeChange = (newType: AccountType) => {
    setType(newType);
    const newSubTypes = SUB_TYPES_BY_TYPE[newType];
    if (subType && !newSubTypes.includes(subType as AccountSubType)) {
      setSubType("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      code,
      type,
      subType: subType || null,
      parentId: parentId || null,
      isPlaceholder,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="account-name" className="font-medium text-sm">
          Name
        </label>
        <input
          id="account-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Cash on Hand"
          className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Code */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="account-code" className="font-medium text-sm">
          Code
        </label>
        <input
          id="account-code"
          type="text"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="1000"
          className="rounded-md border border-border bg-background px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Type */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="account-type" className="font-medium text-sm">
          Type
        </label>
        <select
          id="account-type"
          value={type}
          onChange={(e) => handleTypeChange(e.target.value as AccountType)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {ACCOUNT_TYPES.map((t) => (
            <option key={t} value={t}>
              {formatLabel(t)}
            </option>
          ))}
        </select>
      </div>

      {/* Sub-type */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="account-sub-type" className="font-medium text-sm">
          Sub-type
        </label>
        <select
          id="account-sub-type"
          value={subType}
          onChange={(e) => setSubType(e.target.value as AccountSubType | "")}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">None</option>
          {availableSubTypes.map((st) => (
            <option key={st} value={st}>
              {formatLabel(st)}
            </option>
          ))}
        </select>
      </div>

      {/* Parent account */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="account-parent" className="font-medium text-sm">
          Parent account
        </label>
        <select
          id="account-parent"
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">None (top-level)</option>
          {accounts
            .filter((a) => a.rowId !== initialValues?.rowId)
            .map((a) => (
              <option key={a.rowId} value={a.rowId}>
                {a.code} - {a.name}
              </option>
            ))}
        </select>
      </div>

      {/* Is placeholder */}
      <div className="flex items-center gap-2">
        <input
          id="account-placeholder"
          type="checkbox"
          checked={isPlaceholder}
          onChange={(e) => setIsPlaceholder(e.target.checked)}
          className="size-4 rounded border-border"
        />
        <label htmlFor="account-placeholder" className="text-sm">
          Placeholder (parent-only, cannot hold transactions)
        </label>
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
          {initialValues?.rowId ? "Save" : "Create"}
        </button>
      </div>
    </form>
  );
}

export default AccountForm;
