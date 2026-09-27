interface LiabilityAccountPayload {
  bookId: string;
  name: string;
  type: "liability";
  subType: "loan";
}

/**
 * Build the create-account payload for a debt the user owes, so a personal user
 * can add "Loan from John" from the loan form without visiting the accounts
 * page. Returns null when there is nothing valid to create (blank name or no
 * book), so the caller can no-op
 * @param params.bookId - Active book id
 * @param params.name - Debt account name (trimmed)
 */
export const buildLiabilityAccountPayload = (params: {
  bookId: string;
  name: string;
}): LiabilityAccountPayload | null => {
  const name = params.name.trim();
  if (!name || !params.bookId) return null;
  return { bookId: params.bookId, name, type: "liability", subType: "loan" };
};
