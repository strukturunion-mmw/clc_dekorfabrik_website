export type ServiceSlug =
  | "vektorisierung"
  | "stickdatei-digitalisierung"
  | "druckdaten-check"
  | "datei-aufbereitung";

export type EstimatorKind =
  | "vektorisierung"
  | "ki-logo-aufbereitung"
  | "stickdatei-punching"
  | "druckdaten-upsampling";

export type ComplexityTier = "einfach" | "mittel" | "komplex";

export type EmbroideryPlacement = "kragen" | "brust" | "ruecken";

export type EstimatorSelection = {
  estimatorKind: EstimatorKind;
  complexityTier?: ComplexityTier;
  placement?: EmbroideryPlacement;
};

export type PricingEstimate = {
  estimatorKind: EstimatorKind;
  estimatorLabel: string;
  selectionLabel: string;
  minNetEur: number;
  maxNetEur: number;
};
