import type { ProductVariant } from "@/types/storefront";

/**
 * Single-bottle MRP in whole INR (confirm against printed bottle packaging before publishing).
 * All MRPs and selling prices are inclusive of applicable taxes.
 */
export const SINGLE_BOTTLE_MRP_RUPEES = 1499;
export const BASE_BOTTLE_PRICE_RUPEES = 859;
export const BASE_BOTTLE_CAPSULES = 30;
export const PAISE_PER_RUPEE = 100;
export const SINGLE_BOTTLE_MRP_PAISE = SINGLE_BOTTLE_MRP_RUPEES * PAISE_PER_RUPEE;
export const BASE_BOTTLE_PRICE_PAISE = BASE_BOTTLE_PRICE_RUPEES * PAISE_PER_RUPEE;
export const IS_PRICE_TAX_INCLUSIVE = true;
export const ONLINE_PAYMENT_DISCOUNT_PERCENT = 5;

export interface PackTierSpec {
  id: string;
  label: string;
  shortLabel: string;
  bottles: number;
  capsulesTotal: number;
  extraBundleDiscountPercent: number;
  extraBundleLabel?: string;
  bundleTag?: string;
}

export interface CalculatedPackPricing {
  bottles: number;
  capsulesTotal: number;
  /** Total MRP for `bottles` in paise & rupees (inclusive of taxes) */
  mrpTotalPaise: number;
  mrpTotalRupees: number;
  /** Undiscounted base selling total (bottles * ₹859) in paise & rupees */
  baseTotalPaise: number;
  baseTotalRupees: number;
  /** Additional bundle discount % applied on top of base selling price (0, 5, 10) */
  extraBundleDiscountPercent: number;
  /** Overall percentage discount off MRP (43, 46, 48) */
  overallDiscountPercent: number;
  /** Alias matching overall discount off MRP for shared UI consumers */
  discountPercent: number;
  exactFinalPaise: number;
  exactFinalRupees: number;
  /** Whole-rupee rounded final selling price in paise matching the checkout/cart currency precision */
  finalPricePaise: number;
  finalPriceRupees: number;
  /** Discount from MRP down to base selling price (e.g. ₹640, ₹1,280, ₹1,920) */
  productOfferSavingsRupees: number;
  /** Extra bundle discount from base selling price down to final price (e.g. ₹0, ₹86, ₹258) */
  bundleSavingsPaise: number;
  bundleSavingsRupees: number;
  /** Total rupee savings vs MRP (mrpTotalRupees - finalPriceRupees) */
  savingsPaise: number;
  savingsRupees: number;
  perBottlePaise: number;
  perBottleRupees: number;
  onlineDiscountPercent: number;
  onlineDiscountRupees: number;
  onlinePriceRupees: number;
  onlineTotalSavingsRupees: number;
  onlineOverallDiscountPercent: number;
  isTaxInclusive: boolean;
}

/**
 * Returns the extra multi-bottle bundle discount percentage applied on top of the
 * base ₹859/bottle selling price:
 * - 1 bottle: 0%
 * - 2 bottles: Extra 5% bundle discount
 * - 3 or more bottles: Extra 10% bundle discount
 */
export function getDiscountPercentForBottles(totalBottles: number): number {
  const safeBottles = Math.max(1, Math.round(totalBottles));
  if (safeBottles >= 3) return 10;
  if (safeBottles === 2) return 5;
  return 0;
}

/**
 * Single pricing source of truth for Testo Booster Capsules PDP, pack cards, cart, and checkout.
 * Computes bundle pricing in integer paise using whole-rupee rounding consistently:
 * - 1 bottle: MRP ₹1,499 -> Selling ₹859 (Save ₹640, ~43% OFF)
 * - 2 bottles: MRP ₹2,998, base ₹1,718 -> Extra 5% bundle discount -> ₹1,632 (Save ₹1,366, ~46% OFF)
 * - 3 bottles: MRP ₹4,497, base ₹2,577 -> Extra 10% bundle discount -> ₹2,319 (Save ₹2,178, ~48% OFF)
 */
export function calculatePackPricing(
  bottles: number,
  extraBundleDiscountPercent?: number,
  baseBottlePricePaise = BASE_BOTTLE_PRICE_PAISE,
  singleBottleMrpPaise = SINGLE_BOTTLE_MRP_PAISE
): CalculatedPackPricing {
  const safeBottles = Math.max(1, Math.round(bottles));
  const resolvedExtraDiscount =
    extraBundleDiscountPercent !== undefined
      ? extraBundleDiscountPercent
      : getDiscountPercentForBottles(safeBottles);
  const safeExtraDiscount = Math.min(
    100,
    Math.max(0, Math.round(resolvedExtraDiscount))
  );

  const mrpTotalPaise = singleBottleMrpPaise * safeBottles;
  const mrpTotalRupees = Math.round(mrpTotalPaise / PAISE_PER_RUPEE);

  const baseTotalPaise = baseBottlePricePaise * safeBottles;
  const baseTotalRupees = Math.round(baseTotalPaise / PAISE_PER_RUPEE);

  const exactFinalPaise = Math.round(
    (baseTotalPaise * (100 - safeExtraDiscount)) / 100
  );
  const finalPriceRupees = Math.round(exactFinalPaise / PAISE_PER_RUPEE);
  const finalPricePaise = finalPriceRupees * PAISE_PER_RUPEE;

  const productOfferSavingsRupees = Math.max(0, mrpTotalRupees - baseTotalRupees);
  const bundleSavingsPaise = Math.max(0, baseTotalPaise - finalPricePaise);
  const bundleSavingsRupees = Math.max(0, baseTotalRupees - finalPriceRupees);

  const savingsPaise = Math.max(0, mrpTotalPaise - finalPricePaise);
  const savingsRupees = Math.max(0, mrpTotalRupees - finalPriceRupees);

  const overallDiscountPercent =
    mrpTotalRupees > 0
      ? Math.round(((mrpTotalRupees - finalPriceRupees) / mrpTotalRupees) * 100)
      : 0;
  const perBottleRupees = Math.round(finalPriceRupees / safeBottles);

  const onlineDiscountPercent = ONLINE_PAYMENT_DISCOUNT_PERCENT;
  const onlineDiscountRupees = Math.round(
    (finalPriceRupees * onlineDiscountPercent) / 100
  );
  const onlinePriceRupees = Math.max(0, finalPriceRupees - onlineDiscountRupees);
  const onlineTotalSavingsRupees = Math.max(0, mrpTotalRupees - onlinePriceRupees);
  const onlineOverallDiscountPercent =
    mrpTotalRupees > 0
      ? Math.round(((mrpTotalRupees - onlinePriceRupees) / mrpTotalRupees) * 100)
      : 0;

  return {
    bottles: safeBottles,
    capsulesTotal: safeBottles * BASE_BOTTLE_CAPSULES,
    mrpTotalPaise,
    mrpTotalRupees,
    baseTotalPaise,
    baseTotalRupees,
    extraBundleDiscountPercent: safeExtraDiscount,
    overallDiscountPercent,
    discountPercent: overallDiscountPercent,
    exactFinalPaise,
    exactFinalRupees: exactFinalPaise / PAISE_PER_RUPEE,
    finalPricePaise,
    finalPriceRupees,
    productOfferSavingsRupees,
    bundleSavingsPaise,
    bundleSavingsRupees,
    savingsPaise,
    savingsRupees,
    perBottlePaise: perBottleRupees * PAISE_PER_RUPEE,
    perBottleRupees,
    onlineDiscountPercent,
    onlineDiscountRupees,
    onlinePriceRupees,
    onlineTotalSavingsRupees,
    onlineOverallDiscountPercent,
    isTaxInclusive: IS_PRICE_TAX_INCLUSIVE,
  };
}

export interface AllocatedCartLinePricing {
  lineFinalRupees: number;
  lineMrpRupees: number;
  lineBaseRupees: number;
  lineProductOfferSavingsRupees: number;
  lineBundleSavingsRupees: number;
  /** Total savings vs MRP for this line */
  lineSavingsRupees: number;
  overallDiscountPercent: number;
  extraBundleDiscountPercent: number;
  effectiveDiscountPercent: number;
  totalProductBottles: number;
}

/**
 * Allocates exact integer-rupee group tier pricing across all cart line items
 * sharing the same tiered product so combined bottles always receive the exact
 * whole-rupee MRP savings and 2-bottle (extra 5%) or 3+-bottle (extra 10%)
 * bundle discount without rounding drift.
 */
export function allocateTieredCartLines(
  lines: Array<{ id: string; bottles: number }>,
  baseBottlePricePaise = BASE_BOTTLE_PRICE_PAISE,
  singleBottleMrpPaise = SINGLE_BOTTLE_MRP_PAISE
): Record<string, AllocatedCartLinePricing> {
  const totalBottles = lines.reduce(
    (sum, line) => sum + Math.max(1, line.bottles),
    0
  );
  if (totalBottles <= 0 || lines.length === 0) return {};

  const groupPricing = calculatePackPricing(
    totalBottles,
    getDiscountPercentForBottles(totalBottles),
    baseBottlePricePaise,
    singleBottleMrpPaise
  );

  const allocation: Record<string, AllocatedCartLinePricing> = {};
  let allocatedFinal = 0;
  let allocatedBase = 0;
  let allocatedMrp = 0;

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
    const lineMrpRupees = isLast
      ? groupPricing.mrpTotalRupees - allocatedMrp
      : Math.round(
          (groupPricing.mrpTotalRupees * safeLineBottles) / totalBottles
        );

    allocatedFinal += lineFinalRupees;
    allocatedBase += lineBaseRupees;
    allocatedMrp += lineMrpRupees;

    const lineBundleSavingsRupees = Math.max(0, lineBaseRupees - lineFinalRupees);
    const lineProductOfferSavingsRupees = Math.max(
      0,
      lineMrpRupees - lineBaseRupees
    );
    const lineTotalSavings = Math.max(0, lineMrpRupees - lineFinalRupees);

    allocation[line.id] = {
      lineFinalRupees,
      lineMrpRupees,
      lineBaseRupees,
      lineProductOfferSavingsRupees,
      lineBundleSavingsRupees,
      lineSavingsRupees: lineTotalSavings,
      overallDiscountPercent: groupPricing.overallDiscountPercent,
      extraBundleDiscountPercent: groupPricing.extraBundleDiscountPercent,
      effectiveDiscountPercent: groupPricing.overallDiscountPercent,
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
    extraBundleDiscountPercent: 0,
  },
  {
    id: "pack-2",
    label: "Pack of 2",
    shortLabel: "2 Bottles",
    bottles: 2,
    capsulesTotal: 60,
    extraBundleDiscountPercent: 5,
    extraBundleLabel: "Extra 5% bundle discount",
    bundleTag: "Extra 5% bundle discount",
  },
  {
    id: "pack-3",
    label: "Pack of 3",
    shortLabel: "3 Bottles",
    bottles: 3,
    capsulesTotal: 90,
    extraBundleDiscountPercent: 10,
    extraBundleLabel: "Extra 10% bundle discount",
    bundleTag: "Best Value • Extra 10% bundle discount",
  },
];

export function buildTestoBoosterVariants(
  verifiedMrpPerBottle: number | null = SINGLE_BOTTLE_MRP_RUPEES,
  isTaxInclusiveVerified = IS_PRICE_TAX_INCLUSIVE
): ProductVariant[] {
  const effectiveMrpPaise =
    verifiedMrpPerBottle && verifiedMrpPerBottle > 0
      ? verifiedMrpPerBottle * PAISE_PER_RUPEE
      : SINGLE_BOTTLE_MRP_PAISE;

  return TESTO_BOOSTER_PACK_TIERS.map((tier) => {
    const calc = calculatePackPricing(
      tier.bottles,
      tier.extraBundleDiscountPercent,
      BASE_BOTTLE_PRICE_PAISE,
      effectiveMrpPaise
    );

    return {
      id: tier.id,
      label: tier.label,
      shortLabel: tier.shortLabel,
      bottles: tier.bottles,
      capsulesTotal: tier.capsulesTotal,
      packSize: `${tier.shortLabel} • ${tier.capsulesTotal} Veg Capsules`,
      price: calc.finalPriceRupees,
      basePrice: calc.baseTotalRupees,
      compareAtPrice: calc.mrpTotalRupees,
      verifiedMrp: calc.mrpTotalRupees,
      discountPercent: calc.overallDiscountPercent,
      extraBundleDiscountPercent: calc.extraBundleDiscountPercent,
      savingsRupees: calc.savingsRupees,
      bundleSavingsRupees: calc.bundleSavingsRupees,
      perBottleRupees: calc.perBottleRupees,
      onlinePriceRupees: calc.onlinePriceRupees,
      onlineDiscountRupees: calc.onlineDiscountRupees,
      onlineTotalSavingsRupees: calc.onlineTotalSavingsRupees,
      onlineDiscountPercent: calc.onlineDiscountPercent,
      exactDecimalRupees: calc.exactFinalRupees,
      isTaxInclusiveVerified,
      bundleTag: tier.bundleTag,
      extraBundleLabel: tier.extraBundleLabel,
      isPriceConfirmed: true,
    };
  });
}
