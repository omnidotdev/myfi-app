/**
 * Threshold inputs for comparative-report variance flagging. Rows whose percent
 * change or dollar variance meets a threshold get flagged; 0 turns a threshold
 * off. Pairs with ComparativeReportTable's `thresholds` prop
 */
function VarianceThresholdControls({
  pct,
  amount,
  onPctChange,
  onAmountChange,
}: {
  pct: number;
  amount: number;
  onPctChange: (value: number) => void;
  onAmountChange: (value: number) => void;
}) {
  const inputClass =
    "w-20 rounded-md border border-border bg-card px-2 py-1 text-sm";

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <span className="text-muted-foreground">Flag variance over</span>
      <label className="flex items-center gap-1.5">
        <input
          type="number"
          min="0"
          step="1"
          value={pct}
          onChange={(e) => onPctChange(Number.parseFloat(e.target.value) || 0)}
          className={inputClass}
        />
        <span className="text-muted-foreground">%</span>
      </label>
      <span className="text-muted-foreground">or</span>
      <label className="flex items-center gap-1.5">
        <span className="text-muted-foreground">$</span>
        <input
          type="number"
          min="0"
          step="100"
          value={amount}
          onChange={(e) =>
            onAmountChange(Number.parseFloat(e.target.value) || 0)
          }
          className={inputClass}
        />
      </label>
    </div>
  );
}

export default VarianceThresholdControls;
