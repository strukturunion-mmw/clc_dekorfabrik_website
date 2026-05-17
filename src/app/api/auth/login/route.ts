import { createUserSession } from "@/lib/auth/session";
import { AuthError, loginUser } from "@/lib/auth/server";
import {
  getLoginValues,
  validateLoginValues,
  type AuthFieldErrors,
} from "@/lib/auth/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const values = getLoginValues(formData);
    const fieldErrors = validateLoginValues(values);

    if (Object.keys(fieldErrors).length > 0) {
      return Response.json({ ok: false, fieldErrors }, { status: 400 });
    }

    const user = loginUser({
      email: values.email,
      password: values.password,
    });

    await createUserSession(user.id);

    return Response.json({ ok: true, redirectTo: "/konto" });
  } catch (error) {
    if (error instanceof AuthError) {
      const fieldErrors: AuthFieldErrors = {
        form: error.message,
      };

      return Response.json({ ok: false, fieldErrors }, { status: 401 });
    }

    return Response.json(
      {
        ok: false,
        fieldErrors: {
          form: "Die Anmeldung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut.",
        },
      },
      { status: 500 },
    );
  }
}
