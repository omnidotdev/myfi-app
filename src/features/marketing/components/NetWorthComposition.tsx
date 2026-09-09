import { useEffect, useMemo, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  buildNetWorthSeries,
  NET_WORTH_MODULES,
} from "@/features/marketing/components/netWorthDemoData";

const money = (value: number) =>
  `$${Math.round(value).toLocaleString("en-US")}`;

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
};

/**
 * The Clarity feature: an illustrative net worth resolved into stacked module
 * bands over time. Scrub across the chart (or let it play) to read the total and
 * per-module breakdown at any month
 */
function NetWorthComposition() {
  const data = useMemo(() => buildNetWorthSeries(), []);
  const reduced = usePrefersReducedMotion();

  const [active, setActive] = useState(() => Math.round(data.length * 0.72));
  const [playing, setPlaying] = useState(true);
  const [highlight, setHighlight] = useState<string | null>(null);
  const hoverRef = useRef(false);
  const dirRef = useRef(1);

  // gentle autoplay sweep, paused while hovering the chart or under reduced motion
  useEffect(() => {
    if (reduced || !playing) return;
    const id = window.setInterval(() => {
      if (hoverRef.current) return;
      setActive((i) => {
        let next = i + dirRef.current;
        if (next >= data.length - 1) {
          next = data.length - 1;
          dirRef.current = -1;
        } else if (next <= 0) {
          next = 0;
          dirRef.current = 1;
        }
        return next;
      });
    }, 110);
    return () => window.clearInterval(id);
  }, [reduced, playing, data.length]);

  const point = data[active] ?? data[data.length - 1];
  const prev = active > 0 ? data[active - 1] : point;
  const delta = point.total - prev.total;
  const pct = prev.total ? (delta / prev.total) * 100 : 0;
  const up = delta >= 0;

  return (
    <div className="grid overflow-hidden rounded-xl border border-border bg-background md:grid-cols-[336px_1fr]">
      {/* live readout */}
      <div className="flex flex-col border-border border-b p-6 md:border-r md:border-b-0">
        <span className="font-mono text-muted-foreground text-xs tracking-wide">
          {point.label}
        </span>
        <span className="mt-1 font-serif text-4xl text-foreground tabular-nums tracking-tight">
          {money(point.total)}
        </span>
        <span
          className={`mt-2 flex items-center gap-2 font-mono text-sm tabular-nums ${
            up ? "text-primary" : "text-destructive"
          }`}
        >
          <span>
            {up ? "+" : "-"}
            {money(Math.abs(delta)).slice(1)} {up ? "+" : "-"}
            {Math.abs(pct).toFixed(1)}%
          </span>
          <span className="font-sans text-muted-foreground">
            vs prior month
          </span>
        </span>

        <span className="mt-6 mb-1 font-medium font-sans text-[0.7rem] text-muted-foreground uppercase tracking-[0.16em]">
          By module
        </span>
        <div className="flex flex-col">
          {NET_WORTH_MODULES.map((mod) => {
            const value = point[mod.key];
            const share = point.total ? (value / point.total) * 100 : 0;
            const dim = highlight && highlight !== mod.key;
            return (
              <button
                type="button"
                key={mod.key}
                onMouseEnter={() => setHighlight(mod.key)}
                onMouseLeave={() => setHighlight(null)}
                onFocus={() => setHighlight(mod.key)}
                onBlur={() => setHighlight(null)}
                className={`grid grid-cols-[12px_1fr_auto] items-center gap-2.5 border-border/60 border-t py-2 text-left transition-opacity first:border-t-0 hover:bg-muted ${
                  dim ? "opacity-40" : ""
                }`}
              >
                <span
                  className="size-2.5 rounded-[3px]"
                  style={{ background: mod.color }}
                />
                <span className="text-sm">
                  <span className="font-medium text-foreground">
                    {mod.name}
                  </span>
                  <span className="block text-[0.68rem] text-muted-foreground">
                    {mod.note}
                  </span>
                </span>
                <span className="text-right font-mono text-foreground text-sm tabular-nums">
                  {money(value)}
                  <span className="block text-[0.68rem] text-muted-foreground">
                    {share.toFixed(0)}%
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="text-[0.72rem] text-muted-foreground">
            Illustrative demo portfolio, generated deterministically.
          </span>
          {!reduced && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="shrink-0 rounded-full border border-border px-3 py-1 font-medium text-xs transition-colors hover:border-primary/50"
            >
              {playing ? "Pause" : "Play"}
            </button>
          )}
        </div>
      </div>

      {/* stacked area chart */}
      <div className="h-[420px] bg-muted/40 md:h-[520px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 24, right: 24, bottom: 8, left: 8 }}
            onMouseMove={(state) => {
              const idx = state?.activeTooltipIndex;
              if (typeof idx === "number") {
                hoverRef.current = true;
                setActive(idx);
              }
            }}
            onMouseLeave={() => {
              hoverRef.current = false;
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--color-border)"
              strokeOpacity={0.7}
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              interval={11}
              tickFormatter={(value: string) => value.split(" ")[1] ?? ""}
              tick={{
                fontSize: 11,
                fill: "var(--color-muted-foreground)",
                fontFamily: "var(--font-mono)",
              }}
            />
            <YAxis
              width={44}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `$${Math.round(value / 1000)}k`}
              tick={{
                fontSize: 11,
                fill: "var(--color-muted-foreground)",
                fontFamily: "var(--font-mono)",
              }}
            />
            <Tooltip cursor={false} content={() => null} />
            <ReferenceLine
              x={point.label}
              stroke="var(--color-foreground)"
              strokeDasharray="2 4"
              strokeOpacity={0.45}
            />
            {NET_WORTH_MODULES.map((mod) => (
              <Area
                key={mod.key}
                type="monotone"
                dataKey={mod.key}
                stackId="networth"
                stroke={mod.color}
                strokeWidth={0}
                fill={mod.color}
                fillOpacity={highlight && highlight !== mod.key ? 0.3 : 1}
                isAnimationActive={false}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default NetWorthComposition;
