import { getCurrentSessionUser } from "@/lib/auth/session";
import { getOrderByIdForUser, submitRevisionRequestForUser } from "@/lib/orders/store";
import {
  normalizeOrderRevisionInput,
  validateOrderRevisionInput,
} from "@/lib/orders/revisionValidation";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ orderId: string }>;
};

type RevisionRequestPayload = {
  description?: string;
  priority?: string;
  attachmentReference?: string;
};

export async function POST(request: Request, { params }: RouteContext) {
  const user = await getCurrentSessionUser();

  if (!user) {
    return Response.json(
      {
        ok: false,
        fieldErrors: {
          form: "Bitte melden Sie sich an, um eine Revisionsanfrage zu senden.",
        },
      },
      { status: 401 },
    );
  }

  const { orderId } = await params;
  const order = getOrderByIdForUser(user, orderId);

  if (!order) {
    return Response.json(
      {
        ok: false,
        fieldErrors: {
          form: "Der angefragte Auftrag wurde nicht gefunden.",
        },
      },
      { status: 404 },
    );
  }

  let body: RevisionRequestPayload;

  try {
    body = (await request.json()) as RevisionRequestPayload;
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

  const input = normalizeOrderRevisionInput({
    description: body.description ?? "",
    priority: body.priority ?? "",
    attachmentReference: body.attachmentReference ?? "",
  });

  const fieldErrors = validateOrderRevisionInput(order, input);

  if (Object.keys(fieldErrors).length > 0) {
    return Response.json(
      {
        ok: false,
        fieldErrors,
      },
      { status: 400 },
    );
  }

  if (!input.priority) {
    return Response.json(
      {
        ok: false,
        fieldErrors: {
          priority: "Bitte wählen Sie eine Priorität für die Revisionsanfrage.",
        },
      },
      { status: 400 },
    );
  }

  const result = submitRevisionRequestForUser(user, {
    orderId,
    description: input.description,
    priority: input.priority,
    attachmentReference: input.attachmentReference,
  });

  if (!result.ok) {
    const reasonMessageMap = {
      NOT_FOUND: "Der Auftrag wurde nicht gefunden.",
      INELIGIBLE:
        "Revisionsanfragen sind für diesen Auftragsstatus aktuell nicht verfügbar.",
      RATE_LIMITED:
        "Sie haben vor kurzem bereits eine Revisionsanfrage gesendet. Bitte warten Sie kurz.",
      DUPLICATE:
        "Diese Revisionsanfrage wurde bereits in ähnlicher Form übermittelt. Bitte ergänzen Sie neue Details.",
    } as const;

    return Response.json(
      {
        ok: false,
        fieldErrors: {
          form: reasonMessageMap[result.reason],
        },
      },
      {
        status:
          result.reason === "NOT_FOUND"
            ? 404
            : result.reason === "INELIGIBLE"
              ? 409
              : 429,
      },
    );
  }

  return Response.json({
    ok: true,
    revisionRequestId: result.revisionRequest.id,
    orderId,
  });
}
