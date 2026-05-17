"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function LogoutButton() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const payload = (await response.json()) as
        | { ok: true; redirectTo: string }
        | { ok: false };

      if (!response.ok || !payload.ok) {
        return;
      }

      router.push(payload.redirectTo);
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Button type="button" variant="secondary" onClick={handleLogout} disabled={isSubmitting}>
      {isSubmitting ? "Abmeldung läuft …" : "Abmelden"}
    </Button>
  );
}
