import type { Metadata } from "next";
import { PageShell } from "@/components/sections/PageShell";
import { Pill } from "@/components/ui/Pill";
import { inquiryEmail } from "@/components/siteContent";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Kontakt & Upload",
  description:
    "Datei hochladen, Projekt kurz beschreiben und DSGVO-konform eine Anfrage an Dekorfabrik senden.",
};

const checkpoints = [
  "Name, E-Mail und kurzer Projektkontext",
  "Bis zu 10 PDF- oder Bilddateien",
  "Prüfung vor Angebot und Produktionsfreigabe",
  "Antwort an inquiries@dekorfabrik.de",
];

export default function ContactPage() {
  return (
    <PageShell>
      <section
        className="mx-auto max-w-content px-6 pt-12 pb-12 lg:pt-16"
        aria-labelledby="contact-title"
      >
        <Pill tone="sky" dot>
          MVP · Kontakt & Upload
        </Pill>
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <h1
              id="contact-title"
              className="font-display text-d4 font-normal text-balance text-navy-900 md:text-d3"
            >
              Datei hochladen, Projekt skizzieren und sauber anfragen.
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-md text-navy-700">
              Nutzen Sie das Formular, wenn wir Ihre Datei, den Einsatzzweck und
              den gewünschten Lieferzustand einordnen sollen. Wir prüfen die
              Angaben manuell, melden uns mit einer Einschätzung zurück und
              starten erst nach klarer Freigabe.
            </p>
          </div>

          <aside className="rounded-xl bg-navy-800 p-6 text-paper-100 shadow-md">
            <div className="font-brand text-xs uppercase tracking-brand text-navy-200">
              Vor dem Absenden
            </div>
            <h2 className="mt-3 font-display text-xl font-normal text-balance">
              Diese Infos helfen uns sofort weiter
            </h2>
            <ul className="mt-6 space-y-3 font-sans text-sm text-navy-200" role="list">
              {checkpoints.map((checkpoint) => (
                <li key={checkpoint} className="flex gap-3">
                  <span aria-hidden="true">•</span>
                  <span>{checkpoint}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-sm text-navy-200">
              Falls der Formularversand gerade nicht verfügbar sein sollte,
              erreichen Sie uns direkt unter{" "}
              <a className="underline" href={`mailto:${inquiryEmail}`}>
                {inquiryEmail}
              </a>
              .
            </p>
          </aside>
        </div>
      </section>

      <section
        className="mx-auto max-w-content px-6 pb-24"
        aria-labelledby="contact-form-title"
      >
        <div className="mb-6">
          <div className="font-brand text-xs uppercase tracking-brand text-ink-500">
            Anfrageformular
          </div>
          <h2
            id="contact-form-title"
            className="mt-2 font-display text-d5 font-normal text-balance text-navy-900"
          >
            Alles in einem Schritt übermitteln.
          </h2>
        </div>
        <ContactForm />
      </section>
    </PageShell>
  );
}
