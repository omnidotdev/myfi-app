import { createFileRoute } from "@tanstack/react-router";
import { Loader2Icon, PlusIcon, ShieldIcon, TrashIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import BookPicker from "@/features/books/components/BookPicker";
import { API_URL } from "@/lib/config/env.config";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/settings/access")({
  component: AccessPage,
});

type BookAccess = {
  id: string;
  bookId: string;
  userId: string;
  role: string;
  invitedBy: string | null;
  invitedAt: string | null;
  createdAt: string;
};

const ROLES = ["owner", "editor", "viewer"] as const;

const roleBadgeClass: Record<string, string> = {
  owner: "bg-amber-500/10 text-amber-600",
  editor: "bg-blue-500/10 text-blue-600",
  viewer: "bg-gray-500/10 text-gray-600",
};

function AccessPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [records, setRecords] = useState<BookAccess[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Invite form
  const [newUserId, setNewUserId] = useState("");
  const [newRole, setNewRole] = useState<string>("viewer");

  const fetchRecords = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/api/book-access?bookId=${activeBookId}`,
      );
      const data = await res.json();

      setRecords(data.records ?? []);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const handleInvite = useCallback(async () => {
    if (!activeBookId || !newUserId.trim()) return;

    setIsSaving(true);

    try {
      await fetch(`${API_URL}/api/book-access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: activeBookId,
          userId: newUserId.trim(),
          role: newRole,
        }),
      });

      setNewUserId("");
      setNewRole("viewer");
      await fetchRecords();
    } catch {
      // Silently handle errors
    } finally {
      setIsSaving(false);
    }
  }, [activeBookId, newUserId, newRole, fetchRecords]);

  const handleUpdateRole = useCallback(
    async (id: string, role: string) => {
      try {
        await fetch(`${API_URL}/api/book-access/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role }),
        });

        await fetchRecords();
      } catch {
        // Silently handle errors
      }
    },
    [fetchRecords],
  );

  const handleRemove = useCallback(
    async (id: string, userId: string) => {
      if (!confirm(`Remove access for "${userId}"? This cannot be undone.`))
        return;

      try {
        await fetch(`${API_URL}/api/book-access/${id}`, {
          method: "DELETE",
        });

        await fetchRecords();
      } catch {
        // Silently handle errors
      }
    },
    [fetchRecords],
  );

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Access Control</h1>
          <p className="text-muted-foreground text-sm">
            Manage who has access to each book and their role
          </p>
        </div>

        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      {/* Invite form */}
      {!loading && (
        <div className="flex items-end gap-3">
          <div className="flex flex-col gap-1">
            <label
              className="text-muted-foreground text-xs"
              htmlFor="invite-user-id"
            >
              User ID
            </label>
            <input
              id="invite-user-id"
              type="text"
              value={newUserId}
              onChange={(e) => setNewUserId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleInvite();
              }}
              placeholder="User ID or email"
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="text-muted-foreground text-xs"
              htmlFor="invite-role"
            >
              Role
            </label>
            <select
              id="invite-role"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleInvite}
            disabled={!newUserId.trim() || isSaving}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <PlusIcon className="size-4" />
            )}
            Grant Access
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Empty state */}
      {!loading && records.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-8 text-center">
          <ShieldIcon className="mb-2 size-8 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            No access records yet. Grant someone access above.
          </p>
        </div>
      )}

      {/* Access list */}
      {!loading && records.length > 0 && (
        <div className="rounded-lg border border-border bg-card">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 border-border border-b px-4 py-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
            <span>User</span>
            <span>Role</span>
            <span>Invited By</span>
            <span>Invited</span>
            <span />
          </div>

          <div className="divide-y divide-border">
            {records.map((record) => (
              <div
                key={record.id}
                className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 px-4 py-3"
              >
                <span className="truncate font-medium text-sm">
                  {record.userId}
                </span>

                <select
                  value={record.role}
                  onChange={(e) => handleUpdateRole(record.id, e.target.value)}
                  className={`cursor-pointer rounded-full border-0 px-2.5 py-0.5 font-medium text-xs ${roleBadgeClass[record.role] ?? "bg-muted text-muted-foreground"}`}
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </option>
                  ))}
                </select>

                <span className="text-muted-foreground text-sm">
                  {record.invitedBy ?? "-"}
                </span>

                <span className="text-muted-foreground text-sm">
                  {record.invitedAt
                    ? new Date(record.invitedAt).toLocaleDateString()
                    : "-"}
                </span>

                <button
                  type="button"
                  onClick={() => handleRemove(record.id, record.userId)}
                  className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  title="Remove access"
                >
                  <TrashIcon className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
