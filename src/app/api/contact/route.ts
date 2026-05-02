import { inquiryEmail } from "@/components/siteContent";
import {
  getContactValues,
  validateContactValues,
} from "@/app/kontakt/contactValidation";

export const runtime = "nodejs";

type MailjetAttachment = {
  ContentType: string;
  Filename: string;
  Base64Content: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`missing_env:${name}`);
  }

  return value;
}

async function fileToAttachment(file: File): Promise<MailjetAttachment> {
  const arrayBuffer = await file.arrayBuffer();

  return {
    ContentType: file.type || "application/octet-stream",
    Filename: file.name,
    Base64Content: Buffer.from(arrayBuffer).toString("base64"),
  };
}

function buildTextPart(input: {
  name: string;
  email: string;
  phone: string;
  details: string;
  consentAt: string;
  files: File[];
}) {
  const lines = [
    "Neue Dekorfabrik-Anfrage",
    "",
    `Name: ${input.name}`,
    `E-Mail: ${input.email}`,
    `Telefon: ${input.phone || "nicht angegeben"}`,
    `Datenschutz bestätigt am: ${input.consentAt}`,
    "",
    "Projektbeschreibung:",
    input.details,
    "",
    "Dateien:",
    ...input.files.map((file) => `- ${file.name} (${Math.ceil(file.size / 1024)} KB)`),
  ];

  return lines.join("\n");
}

function buildHtmlPart(input: {
  name: string;
  email: string;
  phone: string;
  details: string;
  consentAt: string;
  files: File[];
}) {
  return `
    <h2>Neue Dekorfabrik-Anfrage</h2>
    <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
    <p><strong>E-Mail:</strong> ${escapeHtml(input.email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(input.phone || "nicht angegeben")}</p>
    <p><strong>Datenschutz bestätigt am:</strong> ${escapeHtml(input.consentAt)}</p>
    <h3>Projektbeschreibung</h3>
    <p>${escapeHtml(input.details).replaceAll("\n", "<br />")}</p>
    <h3>Dateien</h3>
    <ul>
      ${input.files
        .map(
          (file) =>
            `<li>${escapeHtml(file.name)} (${Math.ceil(file.size / 1024)} KB)</li>`,
        )
        .join("")}
    </ul>
  `.trim();
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const values = getContactValues(formData);
    const fieldErrors = validateContactValues(values);

    if (Object.keys(fieldErrors).length > 0) {
      return Response.json(
        {
          ok: false,
          fieldErrors,
        },
        { status: 400 },
      );
    }

    const apiKey = getRequiredEnv("MAILJET_API_KEY");
    const apiSecret = getRequiredEnv("MAILJET_API_SECRET");
    const fromEmail = getRequiredEnv("MAILJET_FROM_EMAIL");
    const fromName = process.env.MAILJET_FROM_NAME?.trim() || "Dekorfabrik Website";
    const toEmail = process.env.INQUIRY_TO_EMAIL?.trim() || inquiryEmail;
    const sandboxMode = process.env.MAILJET_SANDBOX_MODE === "true";
    const consentAt = new Date().toISOString();
    const attachments = await Promise.all(values.files.map(fileToAttachment));

    const mailjetResponse = await fetch("https://api.mailjet.com/v3.1/send", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        SandboxMode: sandboxMode,
        Messages: [
          {
            From: {
              Email: fromEmail,
              Name: fromName,
            },
            To: [
              {
                Email: toEmail,
                Name: "Dekorfabrik",
              },
            ],
            ReplyTo: {
              Email: values.email,
              Name: values.name,
            },
            Subject: `Neue Anfrage von ${values.name}`,
            TextPart: buildTextPart({ ...values, consentAt }),
            HTMLPart: buildHtmlPart({ ...values, consentAt }),
            Attachments: attachments,
          },
        ],
      }),
    });

    if (!mailjetResponse.ok) {
      const errorBody = await mailjetResponse.text();
      console.error("Mailjet send failed", {
        status: mailjetResponse.status,
        body: errorBody,
      });

      return Response.json(
        {
          ok: false,
          fieldErrors: {
            form: "Der Versand konnte gerade nicht abgeschlossen werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt per E-Mail.",
          },
        },
        { status: 502 },
      );
    }

    return Response.json({
      ok: true,
      redirectTo: "/danke",
    });
  } catch (error) {
    console.error("Contact submission failed", error);

    if (error instanceof Error && error.message.startsWith("missing_env:")) {
      return Response.json(
        {
          ok: false,
          fieldErrors: {
            form: "Der Formularversand ist gerade noch nicht vollständig eingerichtet. Bitte senden Sie Ihre Anfrage vorübergehend per E-Mail an inquiries@dekorfabrik.de.",
          },
        },
        { status: 503 },
      );
    }

    return Response.json(
      {
        ok: false,
        fieldErrors: {
          form: "Beim Versand ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es erneut.",
        },
      },
      { status: 500 },
    );
  }
}
