import { createUserSession } from "@/lib/auth/session";
import { AuthError, registerUser } from "@/lib/auth/server";
import {
  getRegisterValues,
  validateRegisterValues,
  type AuthFieldErrors,
} from "@/lib/auth/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const values = getRegisterValues(formData);
    const fieldErrors = validateRegisterValues(values);

    if (Object.keys(fieldErrors).length > 0) {
      return Response.json({ ok: false, fieldErrors }, { status: 400 });
    }

    const user = registerUser({
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    });

    await createUserSession(user.id);

    return Response.json({ ok: true, redirectTo: "/konto" });
  } catch (error) {
    if (error instanceof AuthError) {
      const fieldErrors: AuthFieldErrors = {};

      if (error.code === "EMAIL_ALREADY_REGISTERED") {
        fieldErrors.email = error.message;
      } else {
        fieldErrors.form = error.message;
      }

      return Response.json({ ok: false, fieldErrors }, { status: 400 });
    }

    return Response.json(
      {
        ok: false,
        fieldErrors: {
          form: "Die Registrierung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut.",
        },
      },
      { status: 500 },
    );
  }
}
