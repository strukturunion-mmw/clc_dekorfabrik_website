import { LinkButton } from "@/components/ui/Button";

export function OrderHistoryEmptyState() {
  return (
    <div className="rounded-xl border border-ink-200/70 bg-paper-50 p-8 text-center shadow-sm">
      <h2 className="font-display text-2xl font-normal text-navy-900">Noch keine Aufträge vorhanden</h2>
      <p className="mx-auto mt-3 max-w-2xl font-sans text-sm text-navy-700">
        Sobald Ihr erster Auftrag erfasst ist, sehen Sie hier den Verlauf inklusive Status und bereitgestellten
        Dateien. Wenn Sie direkt starten möchten, senden Sie uns eine Anfrage mit Ihren Dateien.
      </p>
      <div className="mt-6">
        <LinkButton href="/kontakt" variant="brand">
          Neue Anfrage senden
        </LinkButton>
      </div>
    </div>
  );
}
