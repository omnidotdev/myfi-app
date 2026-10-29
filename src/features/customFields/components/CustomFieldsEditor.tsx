import { useEffect, useState } from "react";

import { apiFetch } from "@/lib/api/apiFetch";

interface Definition {
  id: string;
  label: string;
  fieldType: string;
  position: number;
  isActive?: boolean;
}

interface CustomFieldsEditorProps {
  bookId: string | null;
  entityType: string;
  /** when editing an existing row, its id, so saved values prefill */
  entityId?: string;
  /** definitionId -> value */
  values: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
}

const inputClass =
  "rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

/**
 * Renders inputs for a book's active custom fields of one entity type, as a
 * controlled map of definitionId -> value. Renders nothing when the book has no
 * custom fields for the entity, so forms stay clean until fields are defined
 */
function CustomFieldsEditor({
  bookId,
  entityType,
  entityId,
  values,
  onChange,
}: CustomFieldsEditorProps) {
  const [definitions, setDefinitions] = useState<Definition[]>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: onChange is a setter used only to prefill loaded values; adding it would re-run the fetch
  useEffect(() => {
    if (!bookId) {
      setDefinitions([]);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        if (entityId) {
          const res = await apiFetch(
            `/api/custom-fields/values?bookId=${bookId}&entityType=${entityType}&entityId=${entityId}`,
          );
          const json = await res.json();
          const fields: {
            definitionId: string;
            label: string;
            fieldType: string;
            position: number;
            value: string | null;
          }[] = json.fields ?? [];
          if (cancelled) return;
          setDefinitions(
            fields.map((f) => ({
              id: f.definitionId,
              label: f.label,
              fieldType: f.fieldType,
              position: f.position,
            })),
          );
          const prefill: Record<string, string> = {};
          for (const f of fields)
            if (f.value != null) prefill[f.definitionId] = f.value;
          onChange(prefill);
        } else {
          const res = await apiFetch(
            `/api/custom-fields/definitions?bookId=${bookId}&entityType=${entityType}`,
          );
          const json = await res.json();
          if (cancelled) return;
          setDefinitions(
            (json.definitions ?? []).filter(
              (d: Definition) => d.isActive !== false,
            ),
          );
        }
      } catch {
        if (!cancelled) setDefinitions([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [bookId, entityType, entityId]);

  if (definitions.length === 0) return null;

  const set = (id: string, value: string) =>
    onChange({ ...values, [id]: value });

  return (
    <>
      {definitions.map((d) => {
        const inputId = `cf-${d.id}`;
        return (
          <div key={d.id} className="flex flex-col gap-1.5">
            <label htmlFor={inputId} className="font-medium text-sm">
              {d.label}
            </label>
            {d.fieldType === "boolean" ? (
              <input
                id={inputId}
                type="checkbox"
                checked={values[d.id] === "true"}
                onChange={(e) => set(d.id, e.target.checked ? "true" : "false")}
                className="size-4 rounded border-border"
              />
            ) : (
              <input
                id={inputId}
                type={
                  d.fieldType === "number"
                    ? "number"
                    : d.fieldType === "date"
                      ? "date"
                      : "text"
                }
                value={values[d.id] ?? ""}
                onChange={(e) => set(d.id, e.target.value)}
                className={inputClass}
              />
            )}
          </div>
        );
      })}
    </>
  );
}

export default CustomFieldsEditor;
