"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics/track";

type DownloadFileButtonProps = {
  orderId: string;
  orderReference: string;
  fileId: string;
  fileName: string;
};

export function DownloadFileButton({
  orderId,
  orderReference,
  fileId,
  fileName,
}: DownloadFileButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleDownload() {
    setIsLoading(true);
    setErrorMessage(null);

    trackEvent("download_clicked", {
      orderId,
      orderReference,
      fileId,
      fileName,
    });

    try {
      const response = await fetch(`/api/orders/files/${fileId}/download`, {
        method: "GET",
      });

      if (!response.ok) {
        const fallback =
          "Die Datei konnte aktuell nicht geladen werden. Bitte versuchen Sie es erneut oder kontaktieren Sie den Support über /kontakt.";
        const serverMessage = (await response.text()).trim();
        const message = serverMessage || fallback;

        setErrorMessage(message);
        router.replace(`/konto?downloadError=${encodeURIComponent(message)}`);
        return;
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");

      anchor.href = objectUrl;
      anchor.download = fileName;
      anchor.rel = "noopener";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);

      trackEvent("download_completed", {
        orderId,
        orderReference,
        fileId,
        fileName,
        fileSizeBytes: blob.size,
      });

      router.replace("/konto");
    } catch {
      const message =
        "Download fehlgeschlagen. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es erneut. Wenn das Problem bleibt, nutzen Sie /kontakt.";
      setErrorMessage(message);
      router.replace(`/konto?downloadError=${encodeURIComponent(message)}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        type="button"
        size="sm"
        variant="brand"
        onClick={handleDownload}
        disabled={isLoading}
      >
        {isLoading ? "Download läuft …" : "Datei herunterladen"}
      </Button>

      {errorMessage ? (
        <p className="max-w-[280px] font-sans text-xs text-clay-700" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
