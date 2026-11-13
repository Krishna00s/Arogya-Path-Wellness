/**
 * Asia/Kolkata Timezone Utilities
 *
 * Provides accurate, dependency-free time calculations in Asia/Kolkata (IST: UTC+5:30),
 * including hour/minute extraction, weekday resolution, and deterministic time-window
 * bucketing to ensure stability across page refreshes.
 */

export const ASIA_KOLKATA_TIMEZONE = "Asia/Kolkata";

export interface KolkataTimeSnapshot {
  /** Hour in 24-hour format (0–23) */
  hour: number;
  /** Minute (0–59) */
  minute: number;
  /** Second (0–59) */
  second: number;
  /** Day of week: 0 (Sunday) to 6 (Saturday) */
  dayOfWeek: number;
  /** ISO date string in Kolkata timezone (YYYY-MM-DD) */
  isoDateString: string;
  /** 10-minute bucket index (0–143) within the Kolkata calendar day */
  tenMinuteBucket: number;
  /** Full formatted string for diagnostics (e.g. "13 Nov 2026, 16:52:00 IST") */
  formattedString: string;
  /** Source epoch milliseconds */
  epochMs: number;
}

const WEEKDAY_INDEX_MAP: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/**
 * Extracts a complete time snapshot in Asia/Kolkata for a given Date (or current time).
 * Accepts an optional `date` for deterministic testing across morning, afternoon,
 * evening, late-night, and midnight transitions.
 */
export function getKolkataTimeSnapshot(date: Date = new Date()): KolkataTimeSnapshot {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: ASIA_KOLKATA_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    weekday: "short",
  });

  const parts = formatter.formatToParts(date);
  const partMap: Record<string, string> = {};
  for (const p of parts) {
    partMap[p.type] = p.value;
  }

  // Handle midnight 24 vs 00 edge cases from some runtime formatters
  const rawHour = parseInt(partMap.hour ?? "0", 10);
  const hour = rawHour === 24 ? 0 : rawHour % 24;
  const minute = parseInt(partMap.minute ?? "0", 10);
  const second = parseInt(partMap.second ?? "0", 10);
  const weekdayStr = partMap.weekday ?? "Sun";
  const dayOfWeek = WEEKDAY_INDEX_MAP[weekdayStr] ?? 0;

  const year = partMap.year ?? "2026";
  const month = partMap.month ?? "01";
  const day = partMap.day ?? "01";
  const isoDateString = `${year}-${month}-${day}`;

  // 10-minute bucket index (6 buckets per hour, 144 per day)
  const tenMinuteBucket = hour * 6 + Math.floor(minute / 10);

  const formattedString = `${day}/${month}/${year} ${String(hour).padStart(2, "0")}:${String(
    minute
  ).padStart(2, "0")}:${String(second).padStart(2, "0")} (IST)`;

  return {
    hour,
    minute,
    second,
    dayOfWeek,
    isoDateString,
    tenMinuteBucket,
    formattedString,
    epochMs: date.getTime(),
  };
}

/**
 * Creates a Date object representing an exact Asia/Kolkata date & time.
 * Useful for automated tests and predictable simulation.
 */
export function createKolkataDate(
  year: number,
  monthIndex: number, // 0 = Jan, 11 = Dec
  day: number,
  hour: number,
  minute = 0,
  second = 0
): Date {
  // IST is UTC + 5:30 (330 minutes ahead of UTC)
  const utcMs = Date.UTC(year, monthIndex, day, hour - 5, minute - 30, second);
  return new Date(utcMs);
}
