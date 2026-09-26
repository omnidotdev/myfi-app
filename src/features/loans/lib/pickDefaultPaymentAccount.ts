interface AccountLike {
  rowId: string;
  name: string;
  type: string;
  isPlaceholder?: boolean;
}

/**
 * Choose a sensible default "pay from" account for a new loan: the account cash
 * payments would normally come from. Prefers a checking account by name, then
 * falls back to the first real (non-placeholder) asset. Returns "" when there is
 * nothing suitable, so the caller leaves the field for the user to pick. Only a
 * default; always overridable
 * @param accounts - The book's accounts
 */
export const pickDefaultPaymentAccount = (
  accounts: readonly AccountLike[],
): string => {
  const spendable = accounts.filter(
    (a) => a.type === "asset" && !a.isPlaceholder,
  );
  const checking = spendable.find((a) => /checking/i.test(a.name));
  return (checking ?? spendable[0])?.rowId ?? "";
};
