"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  complexityTierOptions,
  embroideryPlacementOptions,
  estimateFromSelection,
  estimatorKindLabels,
} from "@/lib/pricing/estimators";
import type {
  ComplexityTier,
  EmbroideryPlacement,
  EstimatorKind,
  EstimatorSelection,
  PricingEstimate,
} from "@/lib/pricing/types";

type EstimatorFormErrors = {
  complexityTier?: string;
  placement?: string;
};

type EstimatorFormProps = {
  defaultEstimatorKind: EstimatorKind;
  onEstimate: (estimate: PricingEstimate, selection: EstimatorSelection) => void;
};

export function EstimatorForm({ defaultEstimatorKind, onEstimate }: EstimatorFormProps) {
  const [estimatorKind, setEstimatorKind] = useState<EstimatorKind>(defaultEstimatorKind);
  const [complexityTier, setComplexityTier] = useState<ComplexityTier | "">("");
  const [placement, setPlacement] = useState<EmbroideryPlacement | "">("");
  const [errors, setErrors] = useState<EstimatorFormErrors>({});

  const complexityRef = useRef<HTMLSelectElement>(null);
  const placementRef = useRef<HTMLSelectElement>(null);

  const needsComplexityTier =
    estimatorKind === "vektorisierung" || estimatorKind === "ki-logo-aufbereitung";
  const needsPlacement = estimatorKind === "stickdatei-punching";

  const helperText = useMemo(() => {
    if (estimatorKind === "druckdaten-upsampling") {
      return "Für Druckdaten-Upsampling gilt eine feste Pauschale bei zu geringer Auflösung.";
    }

    if (estimatorKind === "stickdatei-punching") {
      return "Bitte wählen Sie eine Platzierung, damit wir die passende Orientierungsrange zeigen.";
    }

    return "Bitte wählen Sie eine Komplexitätsstufe für die unverbindliche Orientierungsrange.";
  }, [estimatorKind]);

  function handleEstimatorKindChange(nextKind: EstimatorKind) {
    setEstimatorKind(nextKind);
    setErrors({});

    if (nextKind === "stickdatei-punching") {
      setComplexityTier("");
      return;
    }

    if (nextKind === "druckdaten-upsampling") {
      setComplexityTier("");
      setPlacement("");
      return;
    }

    setPlacement("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: EstimatorFormErrors = {};

    if (needsComplexityTier && !complexityTier) {
      nextErrors.complexityTier =
        "Bitte wählen Sie eine Komplexitätsstufe, bevor Sie die Preisorientierung berechnen.";
    }

    if (needsPlacement && !placement) {
      nextErrors.placement =
        "Bitte wählen Sie eine Platzierung, bevor Sie die Preisorientierung berechnen.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);

      if (nextErrors.complexityTier) {
        complexityRef.current?.focus();
      } else if (nextErrors.placement) {
        placementRef.current?.focus();
      }

      return;
    }

    const selection: EstimatorSelection = {
      estimatorKind,
      complexityTier: complexityTier || undefined,
      placement: placement || undefined,
    };

    const estimate = estimateFromSelection(selection);
    setErrors({});
    onEstimate(estimate, selection);
  }

  return (
    <form className="rounded-xl bg-paper-50 p-6 shadow-md" onSubmit={handleSubmit} noValidate>
      <div>
        <label className="block font-sans text-sm text-navy-800" htmlFor="estimator-kind">
          <span className="font-medium">Leistungsart</span>
        </label>
        <select
          id="estimator-kind"
          value={estimatorKind}
          onChange={(event) =>
            handleEstimatorKindChange(event.currentTarget.value as EstimatorKind)
          }
          className="mt-2 w-full rounded-lg border border-ink-200/70 bg-paper-100 px-4 py-3 font-sans text-sm text-navy-900 shadow-xs outline-none transition-colors duration-base focus:border-clay-500"
        >
          <option value="vektorisierung">{estimatorKindLabels.vektorisierung}</option>
          <option value="ki-logo-aufbereitung">
            {estimatorKindLabels["ki-logo-aufbereitung"]}
          </option>
          <option value="stickdatei-punching">
            {estimatorKindLabels["stickdatei-punching"]}
          </option>
          <option value="druckdaten-upsampling">
            {estimatorKindLabels["druckdaten-upsampling"]}
          </option>
        </select>
      </div>

      {needsComplexityTier ? (
        <div className="mt-5">
          <label
            className="block font-sans text-sm text-navy-800"
            htmlFor="estimator-complexity-tier"
          >
            <span className="font-medium">Komplexitätsstufe</span>
          </label>
          <select
            ref={complexityRef}
            id="estimator-complexity-tier"
            value={complexityTier}
            onChange={(event) => {
              setComplexityTier(event.currentTarget.value as ComplexityTier | "");
              setErrors((currentErrors) => ({ ...currentErrors, complexityTier: undefined }));
            }}
            className="mt-2 w-full rounded-lg border border-ink-200/70 bg-paper-100 px-4 py-3 font-sans text-sm text-navy-900 shadow-xs outline-none transition-colors duration-base focus:border-clay-500"
            aria-invalid={errors.complexityTier ? "true" : undefined}
            aria-describedby={errors.complexityTier ? "complexity-tier-error" : undefined}
          >
            <option value="">Bitte auswählen</option>
            {complexityTierOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.complexityTier ? (
            <p id="complexity-tier-error" className="mt-2 font-sans text-sm text-clay-700">
              {errors.complexityTier}
            </p>
          ) : null}
        </div>
      ) : null}

      {needsPlacement ? (
        <div className="mt-5">
          <label
            className="block font-sans text-sm text-navy-800"
            htmlFor="estimator-placement"
          >
            <span className="font-medium">Platzierung</span>
          </label>
          <select
            ref={placementRef}
            id="estimator-placement"
            value={placement}
            onChange={(event) => {
              setPlacement(event.currentTarget.value as EmbroideryPlacement | "");
              setErrors((currentErrors) => ({ ...currentErrors, placement: undefined }));
            }}
            className="mt-2 w-full rounded-lg border border-ink-200/70 bg-paper-100 px-4 py-3 font-sans text-sm text-navy-900 shadow-xs outline-none transition-colors duration-base focus:border-clay-500"
            aria-invalid={errors.placement ? "true" : undefined}
            aria-describedby={errors.placement ? "placement-error" : undefined}
          >
            <option value="">Bitte auswählen</option>
            {embroideryPlacementOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.placement ? (
            <p id="placement-error" className="mt-2 font-sans text-sm text-clay-700">
              {errors.placement}
            </p>
          ) : null}
        </div>
      ) : null}

      <p className="mt-4 font-sans text-sm text-navy-700">{helperText}</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button type="submit" variant="brand">
          Preisorientierung berechnen
        </Button>
      </div>
    </form>
  );
}
