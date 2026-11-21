import TagMultiSelect from "@/features/tags/components/TagMultiSelect";

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

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="tag-filter-select"
        className="text-muted-foreground text-xs"
      >
        Tags
      </label>
      <TagMultiSelect
        id="tag-filter-select"
        tagGroups={tagGroups}
        selectedTagIds={selectedTagIds}
        onChange={onChange}
        className="max-w-sm"
      />
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
