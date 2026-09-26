/**
 * Filter the sidebar nav for the active book's type. Personal books get a
 * simplified nav with business-only items removed and any group left empty
 * dropped; every other type (business, or unknown) shows the full nav. This is
 * the progressive-disclosure core of Simple Mode: hide the business/accounting
 * surface for personal use without a separate app
 * @param groups - The full nav groups (items may carry `businessOnly`)
 * @param bookType - The active book's type, or null/undefined when unknown
 */
export const filterNavForBook = <G extends { items: readonly object[] }>(
  groups: readonly G[],
  bookType: string | null | undefined,
): G[] => {
  if (bookType !== "personal") return [...groups];
  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => !(item as { businessOnly?: boolean }).businessOnly,
      ),
    }))
    .filter((group) => group.items.length > 0) as unknown as G[];
};
