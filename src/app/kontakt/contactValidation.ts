export const CONTACT_MAX_FILES = 10;
export const CONTACT_MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024;
export const CONTACT_MAX_TOTAL_ATTACHMENT_BYTES = 10 * 1024 * 1024;
export const CONTACT_ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/tiff",
  "image/bmp",
] as const;
export const CONTACT_ALLOWED_EXTENSIONS = [
  ".pdf",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".tif",
  ".tiff",
  ".bmp",
] as const;

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  details: string;
  consent: boolean;
  files: File[];
};

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "phone" | "details" | "consent" | "files" | "form", string>
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getExtension(filename: string) {
  const dotIndex = filename.lastIndexOf(".");
  if (dotIndex === -1) {
    return "";
  }

  return filename.slice(dotIndex).toLowerCase();
}

export function isAllowedContactFile(file: File) {
  const mimeType = file.type.toLowerCase();
  const extension = getExtension(file.name);

  return (
    CONTACT_ALLOWED_MIME_TYPES.includes(
      mimeType as (typeof CONTACT_ALLOWED_MIME_TYPES)[number],
    ) ||
    CONTACT_ALLOWED_EXTENSIONS.includes(
      extension as (typeof CONTACT_ALLOWED_EXTENSIONS)[number],
    )
  );
}

export function validateContactValues(values: ContactFormValues) {
  const errors: ContactFieldErrors = {};

  if (!values.name) {
    errors.name = "Bitte tragen Sie Ihren Namen ein.";
  } else if (values.name.length > 120) {
    errors.name = "Der Name ist zu lang. Bitte halten Sie ihn unter 120 Zeichen.";
  }

  if (!values.email) {
    errors.email = "Bitte tragen Sie Ihre E-Mail-Adresse ein.";
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  }

  if (values.phone.length > 50) {
    errors.phone = "Die Telefonnummer ist zu lang. Bitte kürzen Sie den Eintrag.";
  }

  if (!values.details) {
    errors.details = "Bitte beschreiben Sie kurz Ihr Projekt oder Ihre Anfrage.";
  } else if (values.details.length < 20) {
    errors.details =
      "Bitte geben Sie etwas mehr Kontext an, damit wir die Anfrage einordnen können.";
  } else if (values.details.length > 4000) {
    errors.details = "Die Beschreibung ist zu lang. Bitte kürzen Sie den Text.";
  }

  if (!values.consent) {
    errors.consent = "Bitte bestätigen Sie die Datenschutzhinweise.";
  }

  if (values.files.length === 0) {
    errors.files = "Bitte laden Sie mindestens eine Datei hoch.";
  } else if (values.files.length > CONTACT_MAX_FILES) {
    errors.files = `Bitte laden Sie höchstens ${CONTACT_MAX_FILES} Dateien hoch.`;
  } else {
    const oversizedFile = values.files.find(
      (file) => file.size > CONTACT_MAX_FILE_SIZE_BYTES,
    );

    if (oversizedFile) {
      errors.files = `„${oversizedFile.name}“ ist größer als 15 MB. Bitte reduzieren Sie die Dateigröße.`;
    } else {
      const unsupportedFile = values.files.find((file) => !isAllowedContactFile(file));

      if (unsupportedFile) {
        errors.files = `„${unsupportedFile.name}“ ist kein unterstütztes PDF- oder Bildformat.`;
      } else {
        const totalBytes = values.files.reduce((sum, file) => sum + file.size, 0);

        if (totalBytes > CONTACT_MAX_TOTAL_ATTACHMENT_BYTES) {
          errors.files =
            "Die Dateien sind zusammen zu groß für den aktuellen Versandweg. Bitte reduzieren Sie die Gesamtmenge oder senden Sie die Anfrage in zwei Schritten.";
        }
      }
    }
  }

  return errors;
}

export function getContactValues(formData: FormData): ContactFormValues {
  const files = formData
    .getAll("files")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  return {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    phone: String(formData.get("phone") ?? "").trim(),
    details: String(formData.get("details") ?? "").trim(),
    consent: formData.get("consent") === "on",
    files,
  };
}
