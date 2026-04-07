import type { TagGroup } from "@/features/tags/types/tag";

type LineTagPickerProps = {
  tagGroups: TagGroup[];
  selectedTagIds: string[];
  onChange: (tagIds: string[]) => void;
  lineIndex: number;
};

/**
 * Compact multi-select tag picker for a single journal entry line
 */
function LineTagPicker({
  tagGroups,
  selectedTagIds,
  onChange,
  lineIndex,
}: LineTagPickerProps) {
  if (tagGroups.length === 0) return null;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (o) => o.value);

    onChange(selected);
  };

  return (
    <select
      multiple
      value={selectedTagIds}
      onChange={handleChange}
      aria-label={`Line ${lineIndex + 1} tags`}
      className="min-h-[2.25rem] rounded-md border border-border bg-background px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      {tagGroups.map((group) => {
        const active = group.tags.filter((t) => t.isActive);

        if (active.length === 0) return null;

        return (
          <optgroup key={group.id} label={group.name}>
            {active.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.code ? `${tag.code} - ` : ""}
                {tag.name}
              </option>
            ))}
          </optgroup>
        );
      })}
    </select>
  );
}

export default LineTagPicker;
