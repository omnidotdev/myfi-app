import type { ReactNode } from "react";
import { useState } from "react";

type Props = {
  mode: "range" | "point-in-time";
  onGenerate: (params: {
    startDate?: string;
    endDate?: string;
    asOfDate?: string;
  }) => void;
  /** Optional slot rendered alongside the date filters (e.g. tag filter) */
  extraFilters?: ReactNode;
};

/**
 * Shared filter bar for report pages
 */
function ReportFilters({ mode, onGenerate, extraFilters }: Props) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [asOfDate, setAsOfDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "point-in-time") {
      onGenerate({ asOfDate });
    } else {
      onGenerate({ startDate, endDate });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-end gap-4 rounded-lg border border-border bg-card p-4"
    >
      {mode === "range" ? (
        <>
          {/* Start date */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="report-start-date"
              className="text-muted-foreground text-xs"
            >
              Start Date
            </label>
            <input
              id="report-start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* End date */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="report-end-date"
              className="text-muted-foreground text-xs"
            >
              End Date
            </label>
            <input
              id="report-end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </>
      ) : (
        // As-of date for point-in-time reports
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="report-as-of-date"
            className="text-muted-foreground text-xs"
          >
            As of Date
          </label>
          <input
            id="report-as-of-date"
            type="date"
            value={asOfDate}
            onChange={(e) => setAsOfDate(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      )}

      {extraFilters}

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
      >
        Generate
      </button>
    </form>
  );
}

export default ReportFilters;
