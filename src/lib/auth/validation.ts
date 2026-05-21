const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 12;
const PASSWORD_MAX_LENGTH = 128;
const FULL_NAME_MAX_LENGTH = 120;

export type RegisterValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  consent: boolean;
};

export type LoginValues = {
  email: string;
  password: string;
};

export type AuthFieldErrors = Partial<
  Record<"fullName" | "email" | "password" | "confirmPassword" | "consent" | "form", string>
>;

export function getRegisterValues(formData: FormData): RegisterValues {
  return {
    fullName: String(formData.get("fullName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
    consent: formData.get("consent") === "on",
  };
}

export function getLoginValues(formData: FormData): LoginValues {
  return {
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? ""),
  };
}

function hasRequiredPasswordComplexity(password: string) {
  const hasLower = /[a-zäöüß]/.test(password);
  const hasUpper = /[A-ZÄÖÜ]/.test(password);
  const hasDigit = /\d/.test(password);

  return hasLower && hasUpper && hasDigit;
}

export function validateRegisterValues(values: RegisterValues): AuthFieldErrors {
  const errors: AuthFieldErrors = {};

  if (!values.fullName) {
    errors.fullName = "Bitte tragen Sie Ihren Namen ein.";
  } else if (values.fullName.length > FULL_NAME_MAX_LENGTH) {
    errors.fullName = "Der Name ist zu lang. Bitte halten Sie ihn unter 120 Zeichen.";
  }

  if (!values.email) {
    errors.email = "Bitte tragen Sie Ihre E-Mail-Adresse ein.";
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  }

  if (!values.password) {
    errors.password = "Bitte vergeben Sie ein Passwort.";
  } else if (values.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = "Ihr Passwort muss mindestens 12 Zeichen lang sein.";
  } else if (values.password.length > PASSWORD_MAX_LENGTH) {
    errors.password = "Ihr Passwort ist zu lang. Bitte maximal 128 Zeichen verwenden.";
  } else if (!hasRequiredPasswordComplexity(values.password)) {
    errors.password =
      "Bitte verwenden Sie mindestens einen Großbuchstaben, einen Kleinbuchstaben und eine Zahl.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Bitte bestätigen Sie Ihr Passwort.";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Die Passwort-Bestätigung stimmt nicht mit dem Passwort überein.";
  }

  if (!values.consent) {
    errors.consent =
      "Bitte bestätigen Sie die Verarbeitung Ihrer Kontodaten inklusive Dokumentation von Zeitpunkt und Policy-Version gemäß Datenschutzerklärung.";
  }

  return errors;
}

export function validateLoginValues(values: LoginValues): AuthFieldErrors {
  const errors: AuthFieldErrors = {};

  if (!values.email) {
    errors.email = "Bitte tragen Sie Ihre E-Mail-Adresse ein.";
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  }

  if (!values.password) {
    errors.password = "Bitte geben Sie Ihr Passwort ein.";
  }

  return errors;
}
