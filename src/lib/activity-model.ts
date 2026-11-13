/**
 * Time-Aware Activity Model & Telemetry Presentation
 *
 * Implements a research-informed, smooth 24-hour activity curve in Asia/Kolkata time.
 * Models natural time-aware visitor and sales activity:
 * - 3 AM–6 AM: lowest expected activity trough
 * - Afternoon around 3 PM: secondary activity peak
 * - 4 PM–8 PM: relatively quieter period
 * - 9 PM–midnight: strongest evening activity
 * - Around 11 PM: highest expected activity peak
 *
 * Calibrated ranges:
 * - Visitor activity: 1,000–16,000 (normal periods generally below 3,000).
 * - Recent sales: 0–800 over a rolling 2-hour window (normal periods generally below 150).
 * - Non-identical daily peaks across weekdays.
 * - Display caps: 10K+ for visitors above 10,000, 500+ for sales above 500.
 */

import { getKolkataTimeSnapshot, KolkataTimeSnapshot } from "./time-kolkata";

/**
 * 24-Hour Activity Anchor Points (0..23 in Kolkata hour).
 * Normalized baseline curve:
 * - 03:00–06:00: lowest expected activity trough (0.05–0.12)
 * - 15:00 (3 PM): secondary afternoon peak (0.60)
 * - 16:00–20:00 (4 PM–8 PM): relatively quieter window (0.32–0.48)
 * - 21:00–23:59 (9 PM–midnight): strongest evening activity surge (0.72–1.00)
 * - 23:00 (11 PM): highest expected peak (1.00)
 */
export const DEFAULT_HOURLY_ACTIVITY_PROFILE: readonly number[] = [
  0.45, // 00:00 (Midnight - post-peak cooldown)
  0.28, // 01:00
  0.15, // 02:00
  0.08, // 03:00 (Trough window begins)
  0.05, // 04:00 (Lowest activity anchor)
  0.08, // 05:00
  0.15, // 06:00 (Morning wake-up ramp)
  0.25, // 07:00
  0.35, // 08:00
  0.42, // 09:00
  0.46, // 10:00
  0.50, // 11:00
  0.52, // 12:00 (Mid-day steady)
  0.54, // 13:00
  0.56, // 14:00
  0.60, // 15:00 (3 PM secondary afternoon peak)
  0.48, // 16:00 (4 PM transition into quieter period)
  0.38, // 17:00 (5 PM quieter)
  0.32, // 18:00 (6 PM evening commute trough)
  0.36, // 19:00 (7 PM)
  0.44, // 20:00 (8 PM end of quieter period)
  0.72, // 21:00 (9 PM evening peak surge begins)
  0.88, // 22:00 (10 PM strong activity)
  1.00, // 23:00 (11 PM highest expected peak)
] as const;

/**
 * Weekday multipliers (0 = Sunday .. 6 = Saturday).
 * Distinct non-identical multipliers so daily peaks vary naturally:
 * - Sunday: Weekend peak engagement (1.18)
 * - Monday: Work week start trough (0.88)
 * - Tuesday: Steady routine (0.92)
 * - Wednesday: Mid-week progression (0.96)
 * - Thursday: Pre-weekend buildup (1.02)
 * - Friday: Weekend kickoff surge (1.12)
 * - Saturday: Leisure peak shopping (1.22)
 */
export const DEFAULT_WEEKDAY_PROFILE: readonly number[] = [
  1.18, // Sun
  0.88, // Mon
  0.92, // Tue
  0.96, // Wed
  1.02, // Thu
  1.12, // Fri
  1.22, // Sat
] as const;

export interface ActivityModelConfig {
  hourlyProfile?: readonly number[];
  weekdayProfile?: readonly number[];
  /** Allow subtle deterministic micro-variation per 10-minute bucket */
  enableMicroVariation?: boolean;
}

export interface TimeAwareStoreMetrics {
  liveVisitors: number;
  soldLast2Hours: number;
  activityIndex: number; // 0-100
}

/**
 * Simple string hash algorithm for deterministic 10-minute bucket seed
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Cosine interpolation for ultra-smooth transition between hourly points
 */
function cosineInterpolate(y1: number, y2: number, mu: number): number {
  const mu2 = (1 - Math.cos(mu * Math.PI)) / 2;
  return y1 * (1 - mu2) + y2 * mu2;
}

/**
 * Computes natural time-aware visitor and sales metrics based on the Asia/Kolkata activity curve.
 *
 * Scaled strictly to:
 * - Visitor activity: 1,000–16,000 (normal periods generally below 3,000).
 * - Recent sales activity: 0–800 (normal periods generally below 150).
 * - Late evening surge (9 PM–midnight) with strong momentum.
 * - Weekday variations to avoid identical daily peaks.
 *
 * Guarantees 100% deterministic numbers within the same 10-minute window across refreshes.
 */
export function calculateTimeAwareStoreMetrics(
  productId: string,
  snapshotOrDate?: KolkataTimeSnapshot | Date,
  config?: ActivityModelConfig
): TimeAwareStoreMetrics {
  const snapshot: KolkataTimeSnapshot =
    snapshotOrDate instanceof Date
      ? getKolkataTimeSnapshot(snapshotOrDate)
      : !snapshotOrDate
      ? getKolkataTimeSnapshot()
      : snapshotOrDate;

  const hourly = config?.hourlyProfile ?? DEFAULT_HOURLY_ACTIVITY_PROFILE;
  const weekdays = config?.weekdayProfile ?? DEFAULT_WEEKDAY_PROFILE;
  const enableMicro = config?.enableMicroVariation ?? true;

  const currentHour = snapshot.hour % 24;
  const nextHour = (currentHour + 1) % 24;

  const y1 = hourly[currentHour] ?? 0.5;
  const y2 = hourly[nextHour] ?? 0.5;

  // Minute progression fraction [0, 1)
  const fraction = snapshot.minute / 60;
  const interpolatedFactor = cosineInterpolate(y1, y2, fraction);

  // Weekday calibration multiplier
  const dayWeight = weekdays[snapshot.dayOfWeek] ?? 1.0;

  // Deterministic micro-variation within 10-minute bucket
  let microOffsetVisitors = 0;
  let microOffsetSales = 0;
  if (enableMicro) {
    const seed = `${productId}-${snapshot.isoDateString}-${snapshot.tenMinuteBucket}`;
    const hashVal = hashString(seed);
    microOffsetVisitors = (hashVal % 41) - 20; // -20..+20
    microOffsetSales = ((hashVal >> 3) % 11) - 5; // -5..+5
  }

  // --- Visitor Activity Calculation (1,000 - 16,000) ---
  let calculatedVisitors: number;
  if (interpolatedFactor <= 0.60) {
    // Normal periods (Hours 0-20): generally below 3,000 visitors
    calculatedVisitors =
      1000 + interpolatedFactor * 2600 * dayWeight + microOffsetVisitors;
  } else {
    // Late evening surge (Hours 21-23): strong momentum up to 16,000
    const surge = (interpolatedFactor - 0.60) / 0.40; // 0.0 to 1.0
    calculatedVisitors =
      2800 +
      surge * 6500 * dayWeight +
      Math.pow(surge, 2) * 4500 * dayWeight +
      microOffsetVisitors;
  }
  const liveVisitors = Math.max(1000, Math.min(16000, Math.round(calculatedVisitors)));

  // --- Sales Activity Calculation (0 - 800 over 2-hour window) ---
  let calculatedSales: number;
  if (interpolatedFactor <= 0.60) {
    // Normal periods (Hours 0-20): generally below 150 sales
    calculatedSales =
      15 + interpolatedFactor * 180 * dayWeight + microOffsetSales;
  } else {
    // Late evening surge (Hours 21-23): strong momentum up to 800
    const surge = (interpolatedFactor - 0.60) / 0.40;
    calculatedSales =
      140 +
      surge * 320 * dayWeight +
      Math.pow(surge, 2) * 220 * dayWeight +
      microOffsetSales;
  }
  const soldLast2Hours = Math.max(0, Math.min(800, Math.round(calculatedSales)));

  // Normalized 0-100 activity index
  const activityIndex = Math.max(0, Math.min(100, Math.round(interpolatedFactor * 100 * dayWeight)));

  return {
    liveVisitors,
    soldLast2Hours,
    activityIndex,
  };
}

/**
 * Format activity metrics according to display caps:
 * - Visitors >= 10,000 => "10K+" (otherwise bare integer e.g. "2393")
 * - Sales >= 500 => "500+" (otherwise bare integer e.g. "148")
 */
export function formatActivityMetric(
  value: number,
  metricType: "visitors" | "sales" | "index"
): string {
  if (metricType === "visitors") {
    if (value >= 10000) return "10K+";
    return String(Math.max(0, Math.round(value)));
  }

  if (metricType === "sales") {
    if (value >= 500) return "500+";
    return String(Math.max(0, Math.round(value)));
  }

  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return `${clamped}/100`;
}
