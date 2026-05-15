import { LinkButton } from "@/components/ui/Button";
import { formatNetEstimate } from "@/lib/pricing/estimators";
import type {
  EstimatorSelection,
  PricingEstimate,
  ServiceSlug,
} from "@/lib/pricing/types";

type EstimateResultProps = {
  serviceSlug: ServiceSlug;
  serviceTitle: string;
  selection: EstimatorSelection;
  estimate: PricingEstimate;
};

export function EstimateResult({
  serviceSlug,
  serviceTitle,
  selection,
  estimate,
}: EstimateResultProps) {
  const estimateLabel = formatNetEstimate(estimate);

  const params = new URLSearchParams({
    estimatorServiceSlug: serviceSlug,
    estimatorServiceLabel: serviceTitle,
    estimatorKind: selection.estimatorKind,
    estimatorKindLabel: estimate.estimatorLabel,
    estimatorSelectionLabel: estimate.selectionLabel,
    estimatorEstimateLabel: estimateLabel,
    estimatorEstimateMinNetEur: String(estimate.minNetEur),
    estimatorEstimateMaxNetEur: String(estimate.maxNetEur),
  });

  const contactHref = `/kontakt?${params.toString()}`;

  return (
    <article className="rounded-xl bg-navy-800 p-6 text-paper-100 shadow-md">
      <div className="font-brand text-xs uppercase tracking-brand text-navy-200">
        Ergebnis · unverbindlich
      </div>
      <h3 className="mt-3 font-display text-d5 font-normal text-balance">
        {estimateLabel}
      </h3>
      <p className="mt-4 font-sans text-sm leading-6 text-navy-100">
        Grundlage: {estimate.estimatorLabel} · {estimate.selectionLabel}
      </p>
      <p className="mt-4 font-sans text-sm leading-6 text-navy-100">
        Diese Preisorientierung ist unverbindlich und netto angegeben. Das finale
        Angebot hängt von Ausgangsdatei, Qualität und Umfang nach manueller
        Prüfung ab.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <LinkButton href={contactHref} variant="brand">
          Mit dieser Auswahl Anfrage starten <span aria-hidden="true">→</span>
        </LinkButton>
        <LinkButton href="/faq#preise" variant="ghost" className="text-paper-100 hover:bg-paper-100/10">
          Preisfragen im FAQ
        </LinkButton>
      </div>
    </article>
  );
}
