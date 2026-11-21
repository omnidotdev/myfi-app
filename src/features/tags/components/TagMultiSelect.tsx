import {
  createListCollection,
  SelectContent,
  SelectControl,
  SelectIndicator,
  SelectItem,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemIndicator,
  SelectItemText,
  SelectPositioner,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@omnidotdev/thornberry/select";
import { ChevronDownIcon } from "lucide-react";
import { useMemo } from "react";

import type { TagGroup } from "@/features/tags/types/tag";

type TagOption = {
  value: string;
  label: string;
  groupId: string;
};

type TagMultiSelectProps = {
  tagGroups: TagGroup[];
  selectedTagIds: string[];
  onChange: (tagIds: string[]) => void;
  /** Trigger id, so an external `<label htmlFor>` can point at it */
  id?: string;
  "aria-label"?: string;
  placeholder?: string;
  size?: "sm" | "md";
  className?: string;
};

/**
 * Styled multi-select for tags, grouped by tag group. Only active tags are
 * offered
 */
function TagMultiSelect({
  tagGroups,
  selectedTagIds,
  onChange,
  id,
  "aria-label": ariaLabel,
  placeholder = "Any tags",
  size = "md",
  className,
}: TagMultiSelectProps) {
  const groups = useMemo(
    () =>
      tagGroups
        .map((group) => ({
          id: group.id,
          name: group.name,
          tags: group.tags.filter((t) => t.isActive),
        }))
        .filter((group) => group.tags.length > 0),
    [tagGroups],
  );

  const collection = useMemo(
    () =>
      createListCollection<TagOption>({
        items: groups.flatMap((group) =>
          group.tags.map((tag) => ({
            value: tag.id,
            label: tag.code ? `${tag.code} - ${tag.name}` : tag.name,
            groupId: group.id,
          })),
        ),
      }),
    [groups],
  );

  return (
    <SelectRoot
      multiple
      collection={collection}
      value={selectedTagIds}
      onValueChange={(details) => onChange(details.value)}
      positioning={{ strategy: "fixed", placement: "bottom-start" }}
      ids={id ? { trigger: id } : undefined}
      className={`min-w-0 max-w-full ${className ?? ""}`}
    >
      <SelectControl>
        <SelectTrigger
          aria-label={ariaLabel}
          className={`w-full border border-input bg-transparent ${
            size === "sm" ? "h-8 px-2.5" : "h-9"
          }`}
        >
          <SelectValueText
            placeholder={placeholder}
            className="truncate data-placeholder-shown:text-muted-foreground"
          />
          <SelectIndicator>
            <ChevronDownIcon className="text-muted-foreground" />
          </SelectIndicator>
        </SelectTrigger>
      </SelectControl>

      <SelectPositioner>
        <SelectContent className="min-w-48">
          {groups.map((group) => (
            <SelectItemGroup key={group.id}>
              <SelectItemGroupLabel>{group.name}</SelectItemGroupLabel>
              {collection.items
                .filter((item) => item.groupId === group.id)
                .map((item) => (
                  <SelectItem key={item.value} item={item}>
                    <SelectItemText>{item.label}</SelectItemText>
                    <SelectItemIndicator />
                  </SelectItem>
                ))}
            </SelectItemGroup>
          ))}
        </SelectContent>
      </SelectPositioner>
    </SelectRoot>
  );
}

export default TagMultiSelect;
