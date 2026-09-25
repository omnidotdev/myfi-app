import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import EmptyState from "@/components/EmptyState";
import BookPicker from "@/features/books/components/BookPicker";
import type { Customer } from "@/features/invoicing/types/invoicing";
import { apiFetch } from "@/lib/api/apiFetch";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/@{$workspaceSlug}/~/customers/")({
  component: CustomersPage,
});

function CustomersPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");

  const fetchCustomers = useCallback(async () => {
    if (!activeBookId) return;
    setIsLoading(true);
    try {
      const res = await apiFetch(`/api/customers?bookId=${activeBookId}`);
      const data = await res.json();
      setCustomers(data.customers ?? []);
    } catch {
      toast.error("Could not load customers");
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const resetForm = useCallback(() => {
    setName("");
    setEmail("");
    setBusinessName("");
    setFormOpen(false);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!activeBookId) return;
      setSaving(true);
      try {
        const res = await apiFetch("/api/customers", {
          method: "POST",
          body: JSON.stringify({
            bookId: activeBookId,
            name,
            email: email || undefined,
            businessName: businessName || undefined,
          }),
        });
        if (!res.ok) throw new Error("Create failed");
        toast.success("Customer added");
        resetForm();
        await fetchCustomers();
      } catch {
        toast.error("Could not add the customer");
      } finally {
        setSaving(false);
      }
    },
    [activeBookId, name, email, businessName, resetForm, fetchCustomers],
  );

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Customers</h1>
          <p className="text-muted-foreground text-sm">
            People and businesses you invoice
          </p>
        </div>
        <div className="flex items-center gap-3">
          <BookPicker
            books={books}
            selectedBookId={activeBookId}
            onSelect={setActiveBookId}
          />
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            disabled={!activeBookId}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            <PlusIcon className="size-4" />
            New Customer
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && customers.length === 0 && (
        <EmptyState
          title="No customers yet"
          description="Add a customer to start invoicing them."
        />
      )}

      {!loading && customers.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-border border-b text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Business</th>
                <th className="px-4 py-3 font-medium">Email</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr
                  key={c.id}
                  className="border-border/50 border-b last:border-0"
                >
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {c.businessName ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {c.email ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={resetForm}
            aria-label="Close dialog"
          />
          <div className="relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
            <h2 className="mb-4 font-semibold text-lg">New Customer</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="cust-name" className="font-medium text-sm">
                  Name
                </label>
                <input
                  id="cust-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="cust-business" className="font-medium text-sm">
                  Business Name
                  <span className="ml-1 font-normal text-muted-foreground">
                    (optional)
                  </span>
                </label>
                <input
                  id="cust-business"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="cust-email" className="font-medium text-sm">
                  Email
                  <span className="ml-1 font-normal text-muted-foreground">
                    (optional)
                  </span>
                </label>
                <input
                  id="cust-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="mt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {saving && <Loader2Icon className="size-4 animate-spin" />}
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
