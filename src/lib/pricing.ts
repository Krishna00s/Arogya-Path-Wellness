import type { ProductVariant } from "@/types/storefront";

export const BASE_BOTTLE_PRICE_RUPEES = 859;
export const BASE_BOTTLE_CAPSULES = 30;
export const PAISE_PER_RUPEE = 100;
export const BASE_BOTTLE_PRICE_PAISE = BASE_BOTTLE_PRICE_RUPEES * PAISE_PER_RUPEE;

export interface PackTierSpec {
  id: string;
  label: string;
  shortLabel: string;
  bottles: number;
  capsulesTotal: number;
  discountPercent: number;
  bundleTag?: string;
}

export interface CalculatedPackPricing {
  bottles: number;
  capsulesTotal: number;
  discountPercent: number;
  baseTotalPaise: number;
  baseTotalRupees: number;
  exactFinalPaise: number;
  exactFinalRupees: number;
  /** Whole-rupee rounded final selling price in paise matching the checkout/cart currency precision */
  finalPricePaise: number;
  finalPriceRupees: number;
  savingsPaise: number;
  savingsRupees: number;
  perBottlePaise: number;
  perBottleRupees: number;
}

/**
 * Returns the bundle discount percentage for any total bottle count:
 * - 1 bottle: 0%
 * - 2 bottles: 5%
 * - 3 or more bottles: 10%
 */
export function getDiscountPercentForBottles(totalBottles: number): number {
  const safeBottles = Math.max(1, Math.round(totalBottles));
  if (safeBottles >= 3) return 10;
  if (safeBottles === 2) return 5;
  return 0;
}

/**
 * Computes pack/quantity pricing in integer paise using the quantity-based
 * tier schedule (2 bottles -> 5% off, 3+ bottles -> 10% off), then rounds to
 * whole rupees to match the storefront's integer-rupee cart currency.
 */
export function calculatePackPricing(
  bottles: number,
  discountPercent?: number,
  baseBottlePricePaise = BASE_BOTTLE_PRICE_PAISE
): CalculatedPackPricing {
  const safeBottles = Math.max(1, Math.round(bottles));
  const resolvedDiscount =
    discountPercent !== undefined
      ? discountPercent
      : getDiscountPercentForBottles(safeBottles);
  const safeDiscount = Math.min(100, Math.max(0, Math.round(resolvedDiscount)));

  const baseTotalPaise = baseBottlePricePaise * safeBottles;
  const exactFinalPaise = Math.round((baseTotalPaise * (100 - safeDiscount)) / 100);
  const finalPriceRupees = Math.round(exactFinalPaise / PAISE_PER_RUPEE);
  const finalPricePaise = finalPriceRupees * PAISE_PER_RUPEE;

  const savingsPaise = Math.max(0, baseTotalPaise - finalPricePaise);
  const perBottleRupees = Math.round(finalPriceRupees / safeBottles);

  return {
    bottles: safeBottles,
    capsulesTotal: safeBottles * BASE_BOTTLE_CAPSULES,
    discountPercent: safeDiscount,
    baseTotalPaise,
    baseTotalRupees: Math.round(baseTotalPaise / PAISE_PER_RUPEE),
    exactFinalPaise,
    exactFinalRupees: exactFinalPaise / PAISE_PER_RUPEE,
    finalPricePaise,
    finalPriceRupees,
    savingsPaise,
    savingsRupees: Math.round(savingsPaise / PAISE_PER_RUPEE),
    perBottlePaise: perBottleRupees * PAISE_PER_RUPEE,
    perBottleRupees,
  };
}

export interface AllocatedCartLinePricing {
  lineFinalRupees: number;
  lineBaseRupees: number;
  lineSavingsRupees: number;
  effectiveDiscountPercent: number;
  totalProductBottles: number;
}

/**
 * Allocates exact integer-rupee group tier pricing across all cart line items
 * sharing the same tiered product so combined bottles always receive the
 * right 2-bottle (5%) or 3+-bottle (10%) discount without rounding drift.
 */
export function allocateTieredCartLines(
  lines: Array<{ id: string; bottles: number }>,
  baseBottlePricePaise = BASE_BOTTLE_PRICE_PAISE
): Record<string, AllocatedCartLinePricing> {
  const totalBottles = lines.reduce(
    (sum, line) => sum + Math.max(1, line.bottles),
    0
  );
  if (totalBottles <= 0 || lines.length === 0) return {};

  const groupPricing = calculatePackPricing(
    totalBottles,
    getDiscountPercentForBottles(totalBottles),
    baseBottlePricePaise
  );

  const allocation: Record<string, AllocatedCartLinePricing> = {};
  let allocatedFinal = 0;
  let allocatedBase = 0;

  lines.forEach((line, index) => {
    const safeLineBottles = Math.max(1, line.bottles);
    const isLast = index === lines.length - 1;

    const lineFinalRupees = isLast
      ? groupPricing.finalPriceRupees - allocatedFinal
      : Math.round(
          (groupPricing.finalPriceRupees * safeLineBottles) / totalBottles
        );
    const lineBaseRupees = isLast
      ? groupPricing.baseTotalRupees - allocatedBase
      : Math.round(
          (groupPricing.baseTotalRupees * safeLineBottles) / totalBottles
        );

    allocatedFinal += lineFinalRupees;
    allocatedBase += lineBaseRupees;

    allocation[line.id] = {
      lineFinalRupees,
      lineBaseRupees,
      lineSavingsRupees: Math.max(0, lineBaseRupees - lineFinalRupees),
      effectiveDiscountPercent: groupPricing.discountPercent,
      totalProductBottles: totalBottles,
    };
  });

  return allocation;
}

export const TESTO_BOOSTER_PACK_TIERS: PackTierSpec[] = [
  {
    id: "pack-1",
    label: "Pack of 1",
    shortLabel: "1 Bottle",
    bottles: 1,
    capsulesTotal: 30,
    discountPercent: 0,
  },
  {
    id: "pack-2",
    label: "Pack of 2",
    shortLabel: "2 Bottles",
    bottles: 2,
    capsulesTotal: 60,
    discountPercent: 5,
    bundleTag: "Save 5%",
  },
  {
    id: "pack-3",
    label: "Pack of 3",
    shortLabel: "3 Bottles",
    bottles: 3,
    capsulesTotal: 90,
    discountPercent: 10,
    bundleTag: "Best Bundle Savings • 10% Off",
  },
];

export function buildTestoBoosterVariants(
  verifiedMrpPerBottle?: number | null,
  isTaxInclusiveVerified = false
): ProductVariant[] {
  return TESTO_BOOSTER_PACK_TIERS.map((tier) => {
    const calc = calculatePackPricing(tier.bottles, tier.discountPercent);
    const verifiedMrp =
      verifiedMrpPerBottle && verifiedMrpPerBottle > 0
        ? verifiedMrpPerBottle * tier.bottles
        : null;

    return {
      id: tier.id,
      label: tier.label,
      shortLabel: tier.shortLabel,
      bottles: tier.bottles,
      capsulesTotal: tier.capsulesTotal,
      packSize: `${tier.shortLabel} • ${tier.capsulesTotal} Veg Capsules`,
      price: calc.finalPriceRupees,
      basePrice: calc.baseTotalRupees,
      compareAtPrice: verifiedMrp,
      verifiedMrp,
      discountPercent: calc.discountPercent,
      savingsRupees: calc.savingsRupees,
      perBottleRupees: calc.perBottleRupees,
      exactDecimalRupees: calc.exactFinalRupees,
      isTaxInclusiveVerified,
      bundleTag: tier.bundleTag,
      isPriceConfirmed: true,
    };
  });
}
