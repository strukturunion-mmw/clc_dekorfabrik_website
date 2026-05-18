import { LinkButton } from "@/components/ui/Button";

type OrderHistoryErrorStateProps = {
  title?: string;
  body?: string;
};

export function OrderHistoryErrorState({
  title = "Download derzeit nicht verfügbar",
  body = "Die angeforderte Datei konnte nicht geladen werden. Bitte versuchen Sie es in einigen Minuten erneut. Falls das Problem bestehen bleibt, kontaktieren Sie uns über den Support.",
}: OrderHistoryErrorStateProps) {
  return (
    <div className="rounded-xl border border-clay-300 bg-clay-100 p-6">
      <h2 className="font-display text-xl font-normal text-navy-900">{title}</h2>
      <p className="mt-2 font-sans text-sm text-navy-700">{body}</p>
      <div className="mt-4">
        <LinkButton href="/kontakt" variant="secondary" size="sm">
          Support kontaktieren
        </LinkButton>
      </div>
    </div>
  );
}
