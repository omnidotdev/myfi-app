/**
 * Format a numeric value as USD currency
 * @param value - String or number to format
 */
const formatCurrency = (value: string | number): string => {
  const num = typeof value === "string" ? Number.parseFloat(value) : value;
  if (Number.isNaN(num)) return "$0.00";
  const prefix = num < 0 ? "-" : "";
  return `${prefix}$${Math.abs(num).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Format a signed currency value with +/- prefix
 */
const formatSignedCurrency = (value: string | number): string => {
  const num = typeof value === "string" ? Number.parseFloat(value) : value;
  if (Number.isNaN(num)) return "$0.00";
  const sign = num > 0 ? "+" : "";
  return `${sign}${formatCurrency(num)}`;
};

export { formatCurrency, formatSignedCurrency };

export default formatCurrency;
