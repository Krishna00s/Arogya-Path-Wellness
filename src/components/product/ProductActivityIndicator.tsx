"use client";

import React, { useMemo, useSyncExternalStore } from "react";
import {
  calculateTimeAwareStoreMetrics,
  formatActivityMetric,
} from "@/lib/activity-model";
import { getKolkataTimeSnapshot } from "@/lib/time-kolkata";
import { ServerTelemetryAdapterPayload } from "@/types/storefront";

export interface ProductActivityIndicatorProps {
  productId: string;
  /**
   * Genuine telemetry supplied exclusively through a trusted server-side adapter.
   * When null or undefined, the component renders the Asia/Kolkata modeled estimate
   * with visible "Est." labels to prevent misrepresenting simulated data as completed orders.
   */
  serverTelemetry?: ServerTelemetryAdapterPayload | null;
  /** Optional custom styling classes */
  className?: string;
  /** Controllable clock for unit testing */
  controlledDate?: Date;
}

const emptySubscribe = () => () => {};

function subscribeToClock(onStoreChange: () => void) {
  const timerId = setInterval(onStoreChange, 60_000);
  return () => clearInterval(timerId);
}

export function ProductActivityIndicator({
  productId,
  serverTelemetry,
  className = "",
  controlledDate,
}: ProductActivityIndicatorProps) {
  // Periodic 60-second time subscription
  const currentEpochMs = useSyncExternalStore(
    controlledDate ? emptySubscribe : subscribeToClock,
    () => (controlledDate ? controlledDate.getTime() : Date.now()),
    () => (controlledDate ? controlledDate.getTime() : 0)
  );

  const snapshot = useMemo(() => {
    if (controlledDate) {
      return getKolkataTimeSnapshot(controlledDate);
    }
    return getKolkataTimeSnapshot(
      currentEpochMs > 0 ? new Date(currentEpochMs) : new Date()
    );
  }, [controlledDate, currentEpochMs]);

  // Compute natural time-aware modeled metrics (visitors: 1,000–16,000; sales: 0–800)
  const modeledMetrics = useMemo(() => {
    return calculateTimeAwareStoreMetrics(productId, snapshot);
  }, [productId, snapshot]);

  // Telemetry is ONLY considered genuine when supplied through an authenticated server-side adapter
  const hasServerTelemetry = Boolean(
    serverTelemetry &&
    typeof serverTelemetry.serverTimestamp === "number" &&
    typeof serverTelemetry.adapterId === "string" &&
    serverTelemetry.liveVisitors !== null &&
    serverTelemetry.soldLast2Hours !== null
  );

  const visitorCount = hasServerTelemetry
    ? serverTelemetry!.liveVisitors!
    : modeledMetrics.liveVisitors;

  const salesCount = hasServerTelemetry
    ? serverTelemetry!.soldLast2Hours!
    : modeledMetrics.soldLast2Hours;

  const visitorsLabel = hasServerTelemetry ? "Live Visitors" : "Est. Live Visitors";
  const salesLabel = hasServerTelemetry ? "Sold in last 2 hours" : "Est. Sold in 2h";

  return (
    <div
      data-testid="pdp-activity-indicator"
      className={`flex flex-wrap items-center gap-2 sm:gap-2.5 select-none ${className}`}
      aria-label={`Audience activity: ${formatActivityMetric(
        visitorCount,
        "visitors"
      )} ${visitorsLabel}, ${formatActivityMetric(
        salesCount,
        "sales"
      )} ${salesLabel}`}
    >
      {/* Pill 1: Visitor Activity Badge */}
      <div
        data-testid="pdp-activity-pill-audience"
        className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-white border border-black shadow-2xs text-xs sm:text-[13px] font-semibold text-black transition-all duration-300 motion-reduce:transition-none"
      >
        <span
          className="text-sm leading-none shrink-0"
          role="img"
          aria-label="Visitor activity"
        >
          👁
        </span>
        <span
          data-testid="pdp-activity-count"
          className="font-extrabold text-black"
        >
          {formatActivityMetric(visitorCount, "visitors")}
        </span>
        <span
          data-testid="pdp-activity-label"
          className="text-black font-semibold"
        >
          {visitorsLabel}
        </span>
      </div>

      {/* Pill 2: Recent Sales Activity Badge */}
      <div
        data-testid="pdp-activity-pill-sales"
        className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-white border border-black shadow-2xs text-xs sm:text-[13px] font-semibold text-black transition-all duration-300 motion-reduce:transition-none"
      >
        <span
          className="text-sm leading-none shrink-0"
          role="img"
          aria-label="Recent sales activity"
        >
          📦
        </span>
        <span
          data-testid="pdp-sales-count"
          className="font-extrabold text-black"
        >
          {formatActivityMetric(salesCount, "sales")}
        </span>
        <span
          data-testid="pdp-sales-label"
          className="text-black font-semibold"
        >
          {salesLabel}
        </span>
      </div>
    </div>
  );
}
