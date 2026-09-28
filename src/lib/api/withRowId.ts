/**
 * Add a `rowId` field mirroring the API's `id` to each row. Several UI types
 * (Account, Book, ...) key on `rowId`, but REST endpoints return `id`; without
 * this map a `<select>`/key/lookup built from the raw rows carries `undefined`
 * values. Mirrors the mapping the accounts and books pages already do
 * @param rows - Rows from an API response (may be null/undefined)
 */
export const withRowId = <T extends { id: string }>(
  rows: readonly T[] | null | undefined,
): (T & { rowId: string })[] =>
  (rows ?? []).map((row) => ({ ...row, rowId: row.id }));
