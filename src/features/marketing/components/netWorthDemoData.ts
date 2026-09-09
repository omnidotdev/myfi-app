/**
 * Deterministic, illustrative net-worth series for the marketing landing chart
 *
 * The figures are generated from a fixed seed so the demo reads the same on every
 * load and clearly is not real account data (see the "illustrative" caption on the
 * landing). Each module contributes one band to the stacked composition
 */

/** A module band in the stacked composition, ordered bottom to top of the stack */
export interface NetWorthModule {
  key: "accounts" | "ledger" | "assets" | "budgets" | "crypto";
  name: string;
  note: string;
  /** CSS color reference into the Tailwind theme tokens */
  color: string;
}

/** One month of the illustrative series */
export interface NetWorthPoint {
  /** Short label, e.g. "Jan 2021" */
  label: string;
  /** Year label, or empty string for non-January months */
  year: string;
  accounts: number;
  ledger: number;
  assets: number;
  budgets: number;
  crypto: number;
  total: number;
}

export const NET_WORTH_MODULES: NetWorthModule[] = [
  {
    key: "accounts",
    name: "Accounts",
    note: "cash and bank feeds",
    color: "var(--color-primary-800)",
  },
  {
    key: "ledger",
    name: "Ledger",
    note: "business equity",
    color: "var(--color-primary-700)",
  },
  {
    key: "assets",
    name: "Assets",
    note: "property and holdings",
    color: "var(--color-primary-600)",
  },
  {
    key: "budgets",
    name: "Budgets",
    note: "envelope reserves",
    color: "var(--color-primary-500)",
  },
  {
    key: "crypto",
    name: "Crypto",
    note: "wallets and DeFi",
    color: "var(--color-secondary-400)",
  },
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const COUNT = 60;
const START_YEAR = 2021;

/** Seeded PRNG (mulberry32), so the composition is identical on every render */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

/** Smoothed random walk in [-amp, amp] */
function noiseSeq(
  rng: () => number,
  n: number,
  amp: number,
  smoothness: number,
): number[] {
  const raw: number[] = [];
  let v = 0;
  for (let i = 0; i < n; i++) {
    v = clamp(v + (rng() - 0.5) * amp * 0.9, -amp, amp);
    raw.push(v);
  }
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    let s = 0;
    let c = 0;
    for (let k = -smoothness; k <= smoothness; k++) {
      const j = i + k;
      if (j >= 0 && j < n) {
        s += raw[j] as number;
        c++;
      }
    }
    out.push(s / c);
  }
  return out;
}

/** Build the full illustrative series once (call inside a useMemo) */
export function buildNetWorthSeries(): NetWorthPoint[] {
  const rng = mulberry32(20260908);
  const nA = noiseSeq(rng, COUNT, 2600, 3);
  const nL = noiseSeq(rng, COUNT, 4200, 2);
  const nB = noiseSeq(rng, COUNT, 1400, 1);
  const nC = noiseSeq(rng, COUNT, 9000, 1);

  const points: NetWorthPoint[] = [];
  for (let i = 0; i < COUNT; i++) {
    const f = i / (COUNT - 1);
    const accounts = Math.max(
      6000,
      16000 + 50000 * smooth(f) + (nA[i] as number),
    );
    const ledger = Math.max(
      2000,
      4000 + 150000 * f ** 1.25 + (nL[i] as number),
    );
    // a property purchase steps assets up mid-stream
    const stepUp = f > 0.42 ? smooth(clamp((f - 0.42) / 0.16, 0, 1)) : 0;
    const assets = Math.max(
      10000,
      28000 + 44000 * f + 120000 * stepUp + (nA[i] as number) * 0.6,
    );
    const budgets = Math.max(1500, 3200 + 9000 * f + (nB[i] as number));
    // crypto runs up then draws down, high volatility
    const runUp = smooth(clamp(f / 0.7, 0, 1));
    const drawdown = f > 0.7 ? smooth(clamp((f - 0.7) / 0.3, 0, 1)) : 0;
    const crypto = Math.max(
      1200,
      4000 + 92000 * runUp - 34000 * drawdown + (nC[i] as number) * (0.4 + f),
    );

    const monthIdx = i % 12;
    const year = START_YEAR + Math.floor(i / 12);
    points.push({
      label: `${MONTHS[monthIdx]} ${year}`,
      year: monthIdx === 0 ? String(year) : "",
      accounts,
      ledger,
      assets,
      budgets,
      crypto,
      total: accounts + ledger + assets + budgets + crypto,
    });
  }
  return points;
}
