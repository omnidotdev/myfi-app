import { createFileRoute } from "@tanstack/react-router";
import {
  Loader2Icon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import BookPicker from "@/features/books/components/BookPicker";
import { API_URL } from "@/lib/config/env.config";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/settings/vendors")({
  component: VendorsPage,
});

type Vendor = {
  id: string;
  name: string;
  businessName: string | null;
  tinType: "ssn" | "ein";
  tinMasked: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  email: string | null;
  is1099Eligible: boolean;
  customThreshold: string | null;
};

type VendorFormData = {
  name: string;
  businessName: string;
  tinType: "ssn" | "ein";
  tin: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  is1099Eligible: boolean;
  customThreshold: string;
};

const EMPTY_FORM: VendorFormData = {
  name: "",
  businessName: "",
  tinType: "ein",
  tin: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  is1099Eligible: true,
  customThreshold: "",
};

/** Mask a TIN for display (e.g. ***-**-1234) */
function maskTin(masked: string): string {
  return masked || "***";
}

function VendorsPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVendorId, setEditingVendorId] = useState<string | null>(null);
  const [form, setForm] = useState<VendorFormData>({ ...EMPTY_FORM });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVendors = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/vendors?bookId=${activeBookId}`);
      const data = await res.json();

      setVendors(data.vendors ?? []);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  const resetForm = useCallback(() => {
    setForm({ ...EMPTY_FORM });
    setShowForm(false);
    setEditingVendorId(null);
    setError(null);
  }, []);

  const handleAdd = useCallback(() => {
    setForm({ ...EMPTY_FORM });
    setEditingVendorId(null);
    setError(null);
    setShowForm(true);
  }, []);

  const handleEdit = useCallback((vendor: Vendor) => {
    setForm({
      name: vendor.name,
      businessName: vendor.businessName ?? "",
      tinType: vendor.tinType,
      tin: "",
      address: vendor.address ?? "",
      city: vendor.city ?? "",
      state: vendor.state ?? "",
      zip: vendor.zip ?? "",
      email: vendor.email ?? "",
      is1099Eligible: vendor.is1099Eligible,
      customThreshold: vendor.customThreshold ?? "",
    });
    setEditingVendorId(vendor.id);
    setError(null);
    setShowForm(true);
  }, []);

  const handleDelete = useCallback(
    async (vendorId: string, vendorName: string) => {
      if (!confirm(`Delete vendor "${vendorName}"? This cannot be undone.`))
        return;

      try {
        const res = await fetch(`${API_URL}/api/vendors/${vendorId}`, {
          method: "DELETE",
        });

        if (res.status === 409) {
          setError(
            `Cannot delete "${vendorName}" because it is linked to existing journal entries. Remove those references first.`,
          );
          return;
        }

        if (!res.ok) {
          throw new Error("Delete failed");
        }

        setError(null);
        await fetchVendors();
      } catch {
        setError("Failed to delete vendor");
      }
    },
    [fetchVendors],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!activeBookId) return;

      setIsSaving(true);
      setError(null);

      const body: Record<string, unknown> = {
        name: form.name.trim(),
        businessName: form.businessName.trim() || null,
        tinType: form.tinType,
        address: form.address.trim() || null,
        city: form.city.trim() || null,
        state: form.state.trim() || null,
        zip: form.zip.trim() || null,
        email: form.email.trim() || null,
        is1099Eligible: form.is1099Eligible,
        customThreshold: form.customThreshold.trim() || null,
      };

      // Only include TIN when provided (allow blank on edit to keep existing)
      if (form.tin.trim()) {
        body.tin = form.tin.trim();
      }

      try {
        let res: Response;

        if (editingVendorId) {
          res = await fetch(`${API_URL}/api/vendors/${editingVendorId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
        } else {
          body.bookId = activeBookId;
          body.tin = form.tin.trim();

          res = await fetch(`${API_URL}/api/vendors`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
        }

        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          throw new Error(errData?.message ?? `Request failed (${res.status})`);
        }

        resetForm();
        await fetchVendors();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save vendor");
      } finally {
        setIsSaving(false);
      }
    },
    [activeBookId, editingVendorId, form, fetchVendors, resetForm],
  );

  const updateField = useCallback(
    <K extends keyof VendorFormData>(field: K, value: VendorFormData[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Vendors & 1099</h1>
          <p className="text-muted-foreground text-sm">
            Manage vendors and 1099 eligibility for tax reporting
          </p>
        </div>

        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-center justify-between rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="rounded-md p-1 transition-colors hover:bg-destructive/20"
          >
            <XIcon className="size-4" />
          </button>
        </div>
      )}

      {/* Add vendor button */}
      {!loading && !showForm && (
        <div>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          >
            <PlusIcon className="size-4" />
            Add Vendor
          </button>
        </div>
      )}

      {/* Vendor form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6"
        >
          <h2 className="font-semibold text-lg">
            {editingVendorId ? "Edit Vendor" : "New Vendor"}
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="vendor-name" className="font-medium text-sm">
                Name
              </label>
              <input
                id="vendor-name"
                type="text"
                required
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Business name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="vendor-business-name"
                className="font-medium text-sm"
              >
                Business Name
              </label>
              <input
                id="vendor-business-name"
                type="text"
                value={form.businessName}
                onChange={(e) => updateField("businessName", e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* TIN type */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="vendor-tin-type" className="font-medium text-sm">
                TIN Type
              </label>
              <select
                id="vendor-tin-type"
                value={form.tinType}
                onChange={(e) =>
                  updateField("tinType", e.target.value as "ssn" | "ein")
                }
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="ein">EIN</option>
                <option value="ssn">SSN</option>
              </select>
            </div>

            {/* TIN */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="vendor-tin" className="font-medium text-sm">
                TIN{editingVendorId ? " (leave blank to keep existing)" : ""}
              </label>
              <input
                id="vendor-tin"
                type="password"
                required={!editingVendorId}
                value={form.tin}
                onChange={(e) => updateField("tin", e.target.value)}
                placeholder={editingVendorId ? "Unchanged" : ""}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="vendor-email" className="font-medium text-sm">
                Email
              </label>
              <input
                id="vendor-email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="vendor-address" className="font-medium text-sm">
                Address
              </label>
              <input
                id="vendor-address"
                type="text"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* City */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="vendor-city" className="font-medium text-sm">
                City
              </label>
              <input
                id="vendor-city"
                type="text"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* State */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="vendor-state" className="font-medium text-sm">
                State
              </label>
              <input
                id="vendor-state"
                type="text"
                value={form.state}
                onChange={(e) => updateField("state", e.target.value)}
                maxLength={2}
                placeholder="e.g. CA"
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Zip */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="vendor-zip" className="font-medium text-sm">
                ZIP Code
              </label>
              <input
                id="vendor-zip"
                type="text"
                value={form.zip}
                onChange={(e) => updateField("zip", e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Custom threshold */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="vendor-threshold" className="font-medium text-sm">
                Custom 1099 Threshold
              </label>
              <input
                id="vendor-threshold"
                type="number"
                step="0.01"
                min="0"
                value={form.customThreshold}
                onChange={(e) => updateField("customThreshold", e.target.value)}
                placeholder="Default: $600"
                className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          {/* 1099 eligible toggle */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.is1099Eligible}
              onChange={(e) => updateField("is1099Eligible", e.target.checked)}
              className="size-4 rounded border-border"
            />
            <span className="font-medium">1099 Eligible</span>
          </label>

          {/* Form actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
            >
              {isSaving && <Loader2Icon className="size-4 animate-spin" />}
              {editingVendorId ? "Save Changes" : "Create Vendor"}
            </button>
          </div>
        </form>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Empty state */}
      {!loading && vendors.length === 0 && !showForm && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground text-sm">
            No vendors yet. Add one to start tracking 1099 payments.
          </p>
        </div>
      )}

      {/* Vendor table */}
      {!loading && vendors.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border border-b text-left text-muted-foreground">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Business Name</th>
                <th className="px-4 py-3 font-medium">1099 Eligible</th>
                <th className="px-4 py-3 font-medium">TIN</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {vendors.map((vendor) => (
                <tr
                  key={vendor.id}
                  className="border-border border-b transition-colors hover:bg-accent/30"
                >
                  <td className="px-4 py-3">{vendor.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {vendor.businessName ?? "\u2014"}
                  </td>
                  <td className="px-4 py-3">
                    {vendor.is1099Eligible ? (
                      <span className="rounded-full bg-green-500/10 px-2 py-0.5 font-medium text-green-600 text-xs dark:text-green-400">
                        Eligible
                      </span>
                    ) : (
                      <span className="rounded-full bg-muted px-2 py-0.5 font-medium text-muted-foreground text-xs">
                        Not Eligible
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-muted-foreground">
                    {maskTin(vendor.tinMasked)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => handleEdit(vendor)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                        title="Edit vendor"
                      >
                        <PencilIcon className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(vendor.id, vendor.name)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        title="Delete vendor"
                      >
                        <TrashIcon className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
