import type { BookDetails } from "@/features/books/components/EditBookDetailsDialog";

/**
 * Build the PUT body for a book-details update.
 *
 * The EIN is stored masked and must never be overwritten with a blank value, so
 * it is included only when the user typed a new one (trimmed). The other fields
 * are always sent so clearing a value persists
 */
export const buildBookDetailsPayload = (
  details: BookDetails,
): Record<string, string> => {
  const payload: Record<string, string> = {
    legalName: details.legalName,
    address: details.address,
    city: details.city,
    state: details.state,
    zip: details.zip,
    phone: details.phone,
  };

  const ein = details.ein.trim();
  if (ein) payload.ein = ein;

  return payload;
};
