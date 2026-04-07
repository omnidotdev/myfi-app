import type { TagGroup } from "@/features/tags/types/tag";

type TagFilterProps = {
  tagGroups: TagGroup[];
  selectedTagIds: string[];
  onChange: (tagIds: string[]) => void;
};

/**
 * Multi-select tag filter using optgroups, shown when tag groups exist
 */
function TagFilter({ tagGroups, selectedTagIds, onChange }: TagFilterProps) {
  if (tagGroups.length === 0) return null;

  const activeTags = tagGroups.flatMap((g) => g.tags.filter((t) => t.isActive));

  if (activeTags.length === 0) return null;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (o) => o.value);

    onChange(selected);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="tag-filter-select"
        className="text-muted-foreground text-xs"
      >
        Tags
      </label>
      <select
        id="tag-filter-select"
        multiple
        value={selectedTagIds}
        onChange={handleChange}
        className="min-h-[4.5rem] max-w-sm rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
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
      {selectedTagIds.length > 0 && (
        <button
          type="button"
          onClick={() => onChange([])}
          className="self-start text-muted-foreground text-xs hover:text-foreground"
        >
          Clear tags
        </button>
      )}
    </div>
  );
}

export default TagFilter;
