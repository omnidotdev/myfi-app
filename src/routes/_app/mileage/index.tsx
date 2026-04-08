import { createFileRoute } from "@tanstack/react-router";
import { CarIcon, Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import BookPicker from "@/features/books/components/BookPicker";
import { API_URL } from "@/lib/config/env.config";
import formatCurrency from "@/lib/format/currency";
import useActiveBook from "@/lib/hooks/useActiveBook";

export const Route = createFileRoute("/_app/mileage/")({
  component: MileagePage,
});

type Vehicle = {
  id: string;
  bookId: string;
  name: string;
  year: number | null;
  make: string | null;
  model: string | null;
  dateInService: string | null;
  createdAt: string;
};

type MileageLog = {
  id: string;
  bookId: string;
  vehicleId: string;
  date: string;
  description: string | null;
  origin: string | null;
  destination: string | null;
  odometerStart: string | null;
  odometerEnd: string | null;
  distance: string;
  isRoundTrip: boolean;
  createdAt: string;
  updatedAt: string;
  vehicleName: string;
};

type MileageSummary = {
  totalMiles: string;
  tripCount: number;
  ratePerMile: number;
  deduction: string;
  year: number;
};

function MileagePage() {
  const {
    activeBookId,
    books,
    isLoading: booksLoading,
    setActiveBookId,
  } = useActiveBook();

  const currentYear = new Date().getFullYear();
  const [yearFilter, setYearFilter] = useState(String(currentYear));
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [logs, setLogs] = useState<MileageLog[]>([]);
  const [summary, setSummary] = useState<MileageSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vehicle form state
  const [vName, setVName] = useState("");
  const [vYear, setVYear] = useState("");
  const [vMake, setVMake] = useState("");
  const [vModel, setVModel] = useState("");

  // Mileage form state
  const [mDate, setMDate] = useState("");
  const [mVehicleId, setMVehicleId] = useState("");
  const [mDescription, setMDescription] = useState("");
  const [mOrigin, setMOrigin] = useState("");
  const [mDestination, setMDestination] = useState("");
  const [mDistance, setMDistance] = useState("");
  const [mRoundTrip, setMRoundTrip] = useState(false);

  const fetchVehicles = useCallback(async () => {
    if (!activeBookId) return;

    try {
      const res = await fetch(
        `${API_URL}/api/mileage/vehicles?bookId=${activeBookId}`,
      );
      const data = await res.json();

      setVehicles(data.vehicles ?? []);
    } catch {
      // Silently handle fetch errors
    }
  }, [activeBookId]);

  const fetchLogs = useCallback(async () => {
    if (!activeBookId) return;

    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        bookId: activeBookId,
      });

      if (yearFilter) params.set("year", yearFilter);

      const res = await fetch(`${API_URL}/api/mileage?${params}`);
      const data = await res.json();

      setLogs(data.logs ?? []);
    } catch {
      // Silently handle fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [activeBookId, yearFilter]);

  const fetchSummary = useCallback(async () => {
    if (!activeBookId || !yearFilter) return;

    try {
      const res = await fetch(
        `${API_URL}/api/mileage/summary?bookId=${activeBookId}&year=${yearFilter}`,
      );
      const data = await res.json();

      setSummary(data);
    } catch {
      // Silently handle fetch errors
    }
  }, [activeBookId, yearFilter]);

  useEffect(() => {
    fetchVehicles();
    fetchLogs();
    fetchSummary();
  }, [fetchVehicles, fetchLogs, fetchSummary]);

  const handleAddVehicle = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!activeBookId) return;

      try {
        await fetch(`${API_URL}/api/mileage/vehicles`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookId: activeBookId,
            name: vName,
            year: vYear ? Number(vYear) : undefined,
            make: vMake || undefined,
            model: vModel || undefined,
          }),
        });

        setVName("");
        setVYear("");
        setVMake("");
        setVModel("");
        await fetchVehicles();
      } catch {
        // Silently handle submit errors
      }
    },
    [activeBookId, vName, vYear, vMake, vModel, fetchVehicles],
  );

  const handleDeleteVehicle = useCallback(
    async (id: string) => {
      if (!confirm("Delete this vehicle?")) return;

      try {
        await fetch(`${API_URL}/api/mileage/vehicles/${id}`, {
          method: "DELETE",
        });

        await fetchVehicles();
      } catch {
        // Silently handle delete errors
      }
    },
    [fetchVehicles],
  );

  const handleAddLog = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!activeBookId) return;

      try {
        await fetch(`${API_URL}/api/mileage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookId: activeBookId,
            vehicleId: mVehicleId,
            date: mDate,
            description: mDescription || undefined,
            origin: mOrigin || undefined,
            destination: mDestination || undefined,
            distance: mDistance,
            isRoundTrip: mRoundTrip,
          }),
        });

        setMDate("");
        setMDescription("");
        setMOrigin("");
        setMDestination("");
        setMDistance("");
        setMRoundTrip(false);
        await fetchLogs();
        await fetchSummary();
      } catch {
        // Silently handle submit errors
      }
    },
    [
      activeBookId,
      mVehicleId,
      mDate,
      mDescription,
      mOrigin,
      mDestination,
      mDistance,
      mRoundTrip,
      fetchLogs,
      fetchSummary,
    ],
  );

  const handleDeleteLog = useCallback(
    async (id: string) => {
      if (!confirm("Delete this mileage entry?")) return;

      try {
        await fetch(`${API_URL}/api/mileage/${id}`, {
          method: "DELETE",
        });

        await fetchLogs();
        await fetchSummary();
      } catch {
        // Silently handle delete errors
      }
    },
    [fetchLogs, fetchSummary],
  );

  const loading = booksLoading || isLoading;
  const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Mileage Tracking</h1>
          <p className="text-muted-foreground text-sm">
            Track business mileage for Schedule C deductions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <BookPicker
            books={books}
            selectedBookId={activeBookId}
            onSelect={setActiveBookId}
          />
        </div>
      </div>

      {/* Summary card */}
      {summary && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-muted-foreground text-xs">Total Miles</p>
            <p className="font-bold text-2xl">
              {Number(summary.totalMiles).toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-muted-foreground text-xs">Trips</p>
            <p className="font-bold text-2xl">{summary.tripCount}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-muted-foreground text-xs">IRS Rate</p>
            <p className="font-bold text-2xl">${summary.ratePerMile}/mi</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-muted-foreground text-xs">Est. Deduction</p>
            <p className="font-bold text-2xl">
              {formatCurrency(summary.deduction)}
            </p>
          </div>
        </div>
      )}

      {/* Vehicles section */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h2 className="mb-3 font-semibold text-lg">Vehicles</h2>

        <form
          onSubmit={handleAddVehicle}
          className="mb-4 flex flex-wrap items-end gap-3"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="v-name" className="font-medium text-xs">
              Name
            </label>
            <input
              id="v-name"
              type="text"
              required
              value={vName}
              onChange={(e) => setVName(e.target.value)}
              placeholder="e.g. Work Truck"
              className="rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="v-year" className="font-medium text-xs">
              Year
            </label>
            <input
              id="v-year"
              type="number"
              value={vYear}
              onChange={(e) => setVYear(e.target.value)}
              placeholder="2024"
              className="w-20 rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="v-make" className="font-medium text-xs">
              Make
            </label>
            <input
              id="v-make"
              type="text"
              value={vMake}
              onChange={(e) => setVMake(e.target.value)}
              placeholder="Ford"
              className="w-24 rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="v-model" className="font-medium text-xs">
              Model
            </label>
            <input
              id="v-model"
              type="text"
              value={vModel}
              onChange={(e) => setVModel(e.target.value)}
              placeholder="F-150"
              className="w-24 rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          >
            <PlusIcon className="size-3.5" />
            Add
          </button>
        </form>

        {vehicles.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {vehicles.map((v) => (
              <div
                key={v.id}
                className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm"
              >
                <CarIcon className="size-3.5 text-muted-foreground" />
                <span>
                  {v.name}
                  {v.year ? ` (${v.year})` : ""}
                  {v.make || v.model
                    ? ` - ${[v.make, v.model].filter(Boolean).join(" ")}`
                    : ""}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteVehicle(v.id)}
                  className="ml-1 rounded p-0.5 text-muted-foreground transition-colors hover:text-destructive"
                  aria-label={`Delete ${v.name}`}
                >
                  <Trash2Icon className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {vehicles.length === 0 && (
          <p className="text-muted-foreground text-sm">No vehicles added yet</p>
        )}
      </div>

      {/* Quick-add mileage form */}
      {vehicles.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="mb-3 font-semibold text-lg">Log Trip</h2>

          <form
            onSubmit={handleAddLog}
            className="flex flex-wrap items-end gap-3"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="m-date" className="font-medium text-xs">
                Date
              </label>
              <input
                id="m-date"
                type="date"
                required
                value={mDate}
                onChange={(e) => setMDate(e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="m-vehicle" className="font-medium text-xs">
                Vehicle
              </label>
              <select
                id="m-vehicle"
                required
                value={mVehicleId}
                onChange={(e) => setMVehicleId(e.target.value)}
                className="rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="m-desc" className="font-medium text-xs">
                Description
              </label>
              <input
                id="m-desc"
                type="text"
                value={mDescription}
                onChange={(e) => setMDescription(e.target.value)}
                placeholder="Purpose of trip"
                className="rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="m-origin" className="font-medium text-xs">
                Origin
              </label>
              <input
                id="m-origin"
                type="text"
                value={mOrigin}
                onChange={(e) => setMOrigin(e.target.value)}
                placeholder="From"
                className="w-24 rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="m-dest" className="font-medium text-xs">
                Destination
              </label>
              <input
                id="m-dest"
                type="text"
                value={mDestination}
                onChange={(e) => setMDestination(e.target.value)}
                placeholder="To"
                className="w-24 rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="m-distance" className="font-medium text-xs">
                Miles
              </label>
              <input
                id="m-distance"
                type="number"
                required
                min="0.1"
                step="0.1"
                value={mDistance}
                onChange={(e) => setMDistance(e.target.value)}
                placeholder="0.0"
                className="w-20 rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={mRoundTrip}
                onChange={(e) => setMRoundTrip(e.target.checked)}
                className="rounded border-border"
              />
              Round trip
            </label>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
            >
              <PlusIcon className="size-3.5" />
              Log
            </button>
          </form>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card p-8">
          <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Empty state */}
      {!loading && logs.length === 0 && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <CarIcon className="mx-auto mb-3 size-10 text-muted-foreground" />
          <p className="font-medium">No mileage logged yet</p>
          <p className="mt-1 text-muted-foreground text-sm">
            Add a vehicle above, then log your business trips
          </p>
        </div>
      )}

      {/* Mileage log table */}
      {!loading && logs.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Date
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Vehicle
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Description
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Route
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Miles
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="border-border border-b transition-colors last:border-b-0 hover:bg-muted/30"
                >
                  <td className="px-4 py-3">{log.date}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {log.vehicleName}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {log.description ?? ""}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {[log.origin, log.destination].filter(Boolean).join(" → ")}
                    {log.isRoundTrip && (
                      <span className="ml-1 text-xs">(RT)</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {Number(log.distance).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleDeleteLog(log.id)}
                      className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Delete entry"
                    >
                      <Trash2Icon className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
