/**
 * Convert a snake_case string to Title Case
 */
const formatLabel = (value: string): string =>
  value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default formatLabel;
