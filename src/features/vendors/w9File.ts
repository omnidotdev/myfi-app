/**
 * Client-side W9 file validation, mirroring the server's accepted types and
 * size limit (myfi-api documentRoutes) so an invalid file fails fast before the
 * upload round-trip. Pure and unit-tested; shared by the vendor W9 uploader.
 */

export const W9_ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/heic",
  "application/pdf",
] as const;

export const W9_MAX_BYTES = 50 * 1024 * 1024;

export const W9_ACCEPT_ATTR = ".pdf,.jpg,.jpeg,.png,.heic";

export type W9FileCheck = { ok: true } | { ok: false; error: string };

export const validateW9File = (file: {
  type: string;
  size: number;
}): W9FileCheck => {
  if (!(W9_ACCEPTED_TYPES as readonly string[]).includes(file.type)) {
    return { ok: false, error: "W9 must be a PDF or image (JPEG, PNG, HEIC)" };
  }
  if (file.size > W9_MAX_BYTES) {
    return { ok: false, error: "File must be 50MB or smaller" };
  }

  return { ok: true };
};
