export const inputBaseClassName =
  "mt-2 w-full rounded-lg border border-ink-200/70 bg-paper-100 px-4 py-3 font-sans text-sm text-navy-900 shadow-xs outline-none transition-colors duration-base focus:border-clay-500";

export const errorBoxClassName =
  "mt-6 rounded-lg border border-clay-300 bg-clay-100 px-4 py-3 font-sans text-sm text-clay-700";

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="mt-2 font-sans text-sm text-clay-700">
      {message}
    </p>
  );
}
