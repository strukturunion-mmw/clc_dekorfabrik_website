"use client";

import { useState } from "react";
import {
  getServiceDefaultEstimatorKind,
  estimatorKindLabels,
} from "@/lib/pricing/estimators";
import type {
  EstimatorSelection,
  PricingEstimate,
  ServiceSlug,
} from "@/lib/pricing/types";
import { EstimateResult } from "./EstimateResult";
import { EstimatorForm } from "./EstimatorForm";

type ServicePricingEstimatorProps = {
  serviceSlug: ServiceSlug;
  serviceTitle: string;
};

export function ServicePricingEstimator({
  serviceSlug,
  serviceTitle,
}: ServicePricingEstimatorProps) {
  const defaultEstimatorKind = getServiceDefaultEstimatorKind(serviceSlug);

  const [resultState, setResultState] = useState<{
    estimate: PricingEstimate;
    selection: EstimatorSelection;
  } | null>(null);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)] lg:items-start">
      <div>
        <div className="font-brand text-xs uppercase tracking-brand text-ink-500">
          Preisorientierung
        </div>
        <h2
          id="service-estimator-title"
          className="mt-3 font-display text-d5 font-normal text-balance text-navy-900"
        >
          Unverbindliche Schnellkalkulation für {serviceTitle}
        </h2>
        <p className="mt-4 font-sans text-base leading-7 text-navy-700">
          Wählen Sie die passende Leistungsart und Option. Sie erhalten direkt eine
          erste Netto-Orientierung in EUR und können die Auswahl anschließend mit
          einem Klick in die Anfrage übernehmen.
        </p>
        <p className="mt-3 font-sans text-sm text-navy-700">
          Standardauswahl für diese Seite: {estimatorKindLabels[defaultEstimatorKind]}.
        </p>
      </div>

      <div className="space-y-4">
        <EstimatorForm
          defaultEstimatorKind={defaultEstimatorKind}
          onEstimate={(estimate, selection) => {
            setResultState({ estimate, selection });
          }}
        />

        {resultState ? (
          <EstimateResult
            serviceSlug={serviceSlug}
            serviceTitle={serviceTitle}
            selection={resultState.selection}
            estimate={resultState.estimate}
          />
        ) : null}
      </div>
    </div>
  );
}
