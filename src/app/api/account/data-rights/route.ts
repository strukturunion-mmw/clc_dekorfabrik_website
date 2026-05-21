import { getCurrentSessionUser } from "@/lib/auth/session";
import { AUTH_CONSENT_POLICY_VERSION } from "@/lib/auth/constants";
import { submitDataRightsRequestForUser } from "@/lib/account/dataRightsStore";

export const runtime = "nodejs";

type DataRightsRequestPayload = {
  type?: string;
  note?: string;
};

export async function POST(request: Request) {
  const user = await getCurrentSessionUser();

  if (!user) {
    return Response.json(
      {
        ok: false,
        fieldErrors: {
          form: "Bitte melden Sie sich an, um Datenschutzanfragen zu senden.",
        },
      },
      { status: 401 },
    );
  }

  let body: DataRightsRequestPayload;

  try {
    body = (await request.json()) as DataRightsRequestPayload;
  } catch {
    return Response.json(
      {
        ok: false,
        fieldErrors: {
          form: "Die Anfrage konnte nicht verarbeitet werden. Bitte laden Sie die Seite neu.",
        },
      },
      { status: 400 },
    );
  }

  const type = body.type === "export" || body.type === "deletion" ? body.type : null;

  if (!type) {
    return Response.json(
      {
        ok: false,
        fieldErrors: {
          form: "Bitte wählen Sie aus, ob Sie einen Datenexport oder eine Löschanfrage stellen möchten.",
        },
      },
      { status: 400 },
    );
  }

  const note = String(body.note ?? "");

  if (note.length > 400) {
    return Response.json(
      {
        ok: false,
        fieldErrors: {
          note: "Bitte halten Sie den optionalen Hinweis unter 400 Zeichen.",
        },
      },
      { status: 400 },
    );
  }

  const result = submitDataRightsRequestForUser({
    userId: user.id,
    type,
    policyVersion: AUTH_CONSENT_POLICY_VERSION,
    note,
  });

  if (!result.ok) {
    return Response.json(
      {
        ok: false,
        fieldErrors: {
          form: "Für diesen Anfragetyp wurde in den letzten 24 Stunden bereits eine Anfrage gestellt. Bitte warten Sie kurz.",
        },
      },
      { status: 429 },
    );
  }

  return Response.json({
    ok: true,
    requestId: result.request.id,
    type: result.request.type,
    requestedAt: result.request.requestedAt,
  });
}
