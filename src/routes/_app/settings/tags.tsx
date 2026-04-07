import { createFileRoute } from "@tanstack/react-router";
import {
  CheckIcon,
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

export const Route = createFileRoute("/_app/settings/tags")({
  component: TagsPage,
});

type Tag = {
  id: string;
  name: string;
  code: string | null;
  isActive: boolean;
  tagGroupId: string;
};

type TagGroup = {
  id: string;
  name: string;
  tags: Tag[];
};

type AddTagForm = {
  name: string;
  code: string;
};

type EditTagForm = {
  name: string;
  code: string;
  isActive: boolean;
};

const INITIAL_ADD_TAG: AddTagForm = { name: "", code: "" };

function TagsPage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const [groups, setGroups] = useState<TagGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newGroupName, setNewGroupName] = useState("");
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [addTagForms, setAddTagForms] = useState<Record<string, AddTagForm>>(
    {},
  );
  const [savingTagGroupId, setSavingTagGroupId] = useState<string | null>(null);
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditTagForm>({
    name: "",
    code: "",
    isActive: true,
  });

  const fetchGroups = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/api/tags/groups?bookId=${activeBookId}`,
      );
      const data = await res.json();

      setGroups(data.tagGroups ?? []);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleCreateGroup = useCallback(async () => {
    if (!activeBookId || !newGroupName.trim()) return;

    setIsCreatingGroup(true);

    try {
      await fetch(`${API_URL}/api/tags/groups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: activeBookId,
          name: newGroupName.trim(),
        }),
      });

      setNewGroupName("");
      await fetchGroups();
    } catch {
      // Silently handle errors
    } finally {
      setIsCreatingGroup(false);
    }
  }, [activeBookId, newGroupName, fetchGroups]);

  const handleDeleteGroup = useCallback(
    async (groupId: string, groupName: string) => {
      if (
        !confirm(
          `Delete tag group "${groupName}" and all its tags? This cannot be undone.`,
        )
      )
        return;

      try {
        await fetch(`${API_URL}/api/tags/groups/${groupId}`, {
          method: "DELETE",
        });

        await fetchGroups();
      } catch {
        // Silently handle errors
      }
    },
    [fetchGroups],
  );

  const handleCreateTag = useCallback(
    async (groupId: string) => {
      const form = addTagForms[groupId];
      if (!form?.name.trim()) return;

      setSavingTagGroupId(groupId);

      try {
        await fetch(`${API_URL}/api/tags`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tagGroupId: groupId,
            name: form.name.trim(),
            code: form.code.trim() || null,
          }),
        });

        setAddTagForms((prev) => ({ ...prev, [groupId]: INITIAL_ADD_TAG }));
        await fetchGroups();
      } catch {
        // Silently handle errors
      } finally {
        setSavingTagGroupId(null);
      }
    },
    [addTagForms, fetchGroups],
  );

  const handleToggleActive = useCallback(
    async (tag: Tag) => {
      try {
        await fetch(`${API_URL}/api/tags/${tag.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: !tag.isActive }),
        });

        await fetchGroups();
      } catch {
        // Silently handle errors
      }
    },
    [fetchGroups],
  );

  const handleStartEdit = useCallback((tag: Tag) => {
    setEditingTagId(tag.id);
    setEditForm({
      name: tag.name,
      code: tag.code ?? "",
      isActive: tag.isActive,
    });
  }, []);

  const handleSaveEdit = useCallback(
    async (tagId: string) => {
      if (!editForm.name.trim()) return;

      try {
        await fetch(`${API_URL}/api/tags/${tagId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editForm.name.trim(),
            code: editForm.code.trim() || null,
            isActive: editForm.isActive,
          }),
        });

        setEditingTagId(null);
        await fetchGroups();
      } catch {
        // Silently handle errors
      }
    },
    [editForm, fetchGroups],
  );

  const handleDeleteTag = useCallback(
    async (tagId: string, tagName: string) => {
      if (!confirm(`Delete tag "${tagName}"? This cannot be undone.`)) return;

      try {
        await fetch(`${API_URL}/api/tags/${tagId}`, {
          method: "DELETE",
        });

        await fetchGroups();
      } catch {
        // Silently handle errors
      }
    },
    [fetchGroups],
  );

  const updateAddTagForm = useCallback(
    (groupId: string, field: keyof AddTagForm, value: string) => {
      setAddTagForms((prev) => ({
        ...prev,
        [groupId]: { ...(prev[groupId] ?? INITIAL_ADD_TAG), [field]: value },
      }));
    },
    [],
  );

  const loading = booksLoading || isLoading;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Tags</h1>
          <p className="text-muted-foreground text-sm">
            Organize transactions by department, location, or project
          </p>
        </div>

        <BookPicker
          books={books}
          selectedBookId={activeBookId}
          onSelect={setActiveBookId}
        />
      </div>

      {/* Add group form */}
      {!loading && (
        <div className="flex items-end gap-3">
          <div className="flex flex-col gap-1">
            <label
              className="text-muted-foreground text-xs"
              htmlFor="new-group-name"
            >
              New Tag Group
            </label>
            <input
              id="new-group-name"
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateGroup();
              }}
              placeholder="e.g. Department, Location, Project"
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <button
            type="button"
            onClick={handleCreateGroup}
            disabled={!newGroupName.trim() || isCreatingGroup}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
          >
            {isCreatingGroup ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <PlusIcon className="size-4" />
            )}
            Add Group
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
      {!loading && groups.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground text-sm">
            No tag groups yet. Create one above to get started.
          </p>
        </div>
      )}

      {/* Tag groups */}
      {!loading &&
        groups.map((group) => {
          const addForm = addTagForms[group.id] ?? INITIAL_ADD_TAG;
          const isSavingTag = savingTagGroupId === group.id;

          return (
            <div
              key={group.id}
              className="rounded-lg border border-border bg-card"
            >
              {/* Group header */}
              <div className="flex items-center justify-between border-border border-b px-4 py-3">
                <h2 className="font-medium">{group.name}</h2>

                <button
                  type="button"
                  onClick={() => handleDeleteGroup(group.id, group.name)}
                  className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  title="Delete group"
                >
                  <TrashIcon className="size-4" />
                </button>
              </div>

              {/* Tags list */}
              <div className="divide-y divide-border">
                {group.tags.length === 0 && (
                  <div className="px-4 py-3 text-muted-foreground text-sm">
                    No tags in this group yet
                  </div>
                )}

                {group.tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center gap-3 px-4 py-2"
                  >
                    {editingTagId === tag.id ? (
                      <>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="min-w-0 flex-1 rounded-md border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="Tag name"
                        />
                        <input
                          type="text"
                          value={editForm.code}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              code: e.target.value,
                            }))
                          }
                          className="w-28 rounded-md border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          placeholder="Code"
                        />

                        <button
                          type="button"
                          onClick={() => handleSaveEdit(tag.id)}
                          className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
                          title="Save"
                        >
                          <CheckIcon className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingTagId(null)}
                          className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
                          title="Cancel"
                        >
                          <XIcon className="size-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="min-w-0 flex-1 truncate text-sm">
                          {tag.name}
                        </span>

                        {tag.code && (
                          <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-muted-foreground text-xs">
                            {tag.code}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleToggleActive(tag)}
                          className={`rounded-full px-2 py-0.5 font-medium text-xs transition-colors ${
                            tag.isActive
                              ? "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {tag.isActive ? "Active" : "Inactive"}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStartEdit(tag)}
                          className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
                          title="Edit tag"
                        >
                          <PencilIcon className="size-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteTag(tag.id, tag.name)}
                          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          title="Delete tag"
                        >
                          <TrashIcon className="size-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Add tag inline form */}
              <div className="flex items-center gap-2 border-border border-t px-4 py-2">
                <input
                  type="text"
                  value={addForm.name}
                  onChange={(e) =>
                    updateAddTagForm(group.id, "name", e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreateTag(group.id);
                  }}
                  placeholder="Tag name"
                  className="min-w-0 flex-1 rounded-md border border-border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <input
                  type="text"
                  value={addForm.code}
                  onChange={(e) =>
                    updateAddTagForm(group.id, "code", e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreateTag(group.id);
                  }}
                  placeholder="Code (optional)"
                  className="w-32 rounded-md border border-border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="button"
                  onClick={() => handleCreateTag(group.id)}
                  disabled={!addForm.name.trim() || isSavingTag}
                  className="inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1.5 text-primary-foreground text-sm transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
                >
                  {isSavingTag ? (
                    <Loader2Icon className="size-3.5 animate-spin" />
                  ) : (
                    <PlusIcon className="size-3.5" />
                  )}
                  Add
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
