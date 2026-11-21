import TagMultiSelect from "@/features/tags/components/TagMultiSelect";

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

  return (
    <TagMultiSelect
      tagGroups={tagGroups}
      selectedTagIds={selectedTagIds}
      onChange={onChange}
      aria-label={`Line ${lineIndex + 1} tags`}
      placeholder="Tags"
    />
  );
}

export default LineTagPicker;
