import type {
  ComplexityTier,
  EmbroideryPlacement,
  EstimatorKind,
  EstimatorSelection,
  PricingEstimate,
  ServiceSlug,
} from "./types";

const euroFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

type RangeRule = {
  label: string;
  minNetEur: number;
  maxNetEur: number;
};

export const estimatorKindLabels: Record<EstimatorKind, string> = {
  vektorisierung: "Vektorisierung",
  "ki-logo-aufbereitung": "KI-Logo-Aufbereitung",
  "stickdatei-punching": "Stickdatei-Punching",
  "druckdaten-upsampling": "Druckdaten-Upsampling",
};

export const complexityTierLabels: Record<ComplexityTier, string> = {
  einfach: "Einfach",
  mittel: "Mittel",
  komplex: "Komplex",
};

export const embroideryPlacementLabels: Record<EmbroideryPlacement, string> = {
  kragen: "Kragen",
  brust: "Brust",
  ruecken: "Rücken",
};

export const complexityTierOptions = [
  { value: "einfach", label: complexityTierLabels.einfach },
  { value: "mittel", label: complexityTierLabels.mittel },
  { value: "komplex", label: complexityTierLabels.komplex },
] as const;

export const embroideryPlacementOptions = [
  { value: "kragen", label: embroideryPlacementLabels.kragen },
  { value: "brust", label: embroideryPlacementLabels.brust },
  { value: "ruecken", label: embroideryPlacementLabels.ruecken },
] as const;

const vektorisierungRules: Record<ComplexityTier, RangeRule> = {
  einfach: { label: "Komplexität: Einfach", minNetEur: 29, maxNetEur: 49 },
  mittel: { label: "Komplexität: Mittel", minNetEur: 59, maxNetEur: 89 },
  komplex: { label: "Komplexität: Komplex", minNetEur: 99, maxNetEur: 149 },
};

const kiLogoRules: Record<ComplexityTier, RangeRule> = {
  einfach: { label: "Komplexität: Einfach", minNetEur: 39, maxNetEur: 59 },
  mittel: { label: "Komplexität: Mittel", minNetEur: 69, maxNetEur: 99 },
  komplex: { label: "Komplexität: Komplex", minNetEur: 109, maxNetEur: 159 },
};

const stickdateiRules: Record<EmbroideryPlacement, RangeRule> = {
  kragen: { label: "Platzierung: Kragen", minNetEur: 49, maxNetEur: 69 },
  brust: { label: "Platzierung: Brust", minNetEur: 69, maxNetEur: 99 },
  ruecken: { label: "Platzierung: Rücken", minNetEur: 99, maxNetEur: 149 },
};

const druckdatenUpsamplingFlatFeeNetEur = 39;

function createEstimate(
  estimatorKind: EstimatorKind,
  rule: RangeRule,
): PricingEstimate {
  return {
    estimatorKind,
    estimatorLabel: estimatorKindLabels[estimatorKind],
    selectionLabel: rule.label,
    minNetEur: rule.minNetEur,
    maxNetEur: rule.maxNetEur,
  };
}

export function estimateVektorisierung(tier: ComplexityTier): PricingEstimate {
  return createEstimate("vektorisierung", vektorisierungRules[tier]);
}

export function estimateKiLogoAufbereitung(tier: ComplexityTier): PricingEstimate {
  return createEstimate("ki-logo-aufbereitung", kiLogoRules[tier]);
}

export function estimateStickdateiPunching(
  placement: EmbroideryPlacement,
): PricingEstimate {
  return createEstimate("stickdatei-punching", stickdateiRules[placement]);
}

export function estimateDruckdatenUpsampling(): PricingEstimate {
  return createEstimate("druckdaten-upsampling", {
    label: "Pauschale bei zu geringer Auflösung",
    minNetEur: druckdatenUpsamplingFlatFeeNetEur,
    maxNetEur: druckdatenUpsamplingFlatFeeNetEur,
  });
}

export function estimateFromSelection(
  selection: EstimatorSelection,
): PricingEstimate {
  if (selection.estimatorKind === "vektorisierung") {
    if (!selection.complexityTier) {
      throw new Error("missing_complexity_tier");
    }

    return estimateVektorisierung(selection.complexityTier);
  }

  if (selection.estimatorKind === "ki-logo-aufbereitung") {
    if (!selection.complexityTier) {
      throw new Error("missing_complexity_tier");
    }

    return estimateKiLogoAufbereitung(selection.complexityTier);
  }

  if (selection.estimatorKind === "stickdatei-punching") {
    if (!selection.placement) {
      throw new Error("missing_placement");
    }

    return estimateStickdateiPunching(selection.placement);
  }

  return estimateDruckdatenUpsampling();
}

export function formatNetEstimate(estimate: PricingEstimate) {
  if (estimate.minNetEur === estimate.maxNetEur) {
    return `${euroFormatter.format(estimate.minNetEur)} netto`;
  }

  return `${euroFormatter.format(estimate.minNetEur)} – ${euroFormatter.format(estimate.maxNetEur)} netto`;
}

export function getServiceDefaultEstimatorKind(serviceSlug: ServiceSlug): EstimatorKind {
  switch (serviceSlug) {
    case "vektorisierung":
      return "vektorisierung";
    case "stickdatei-digitalisierung":
      return "stickdatei-punching";
    case "druckdaten-check":
      return "druckdaten-upsampling";
    case "datei-aufbereitung":
      return "ki-logo-aufbereitung";
    default:
      return "vektorisierung";
  }
}
