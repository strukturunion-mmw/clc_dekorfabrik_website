import { getCurrentSessionUser } from "@/lib/auth/session";
import { getDownloadableFileForUser } from "@/lib/orders/store";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ fileId: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const user = await getCurrentSessionUser();

  if (!user) {
    return new Response("Bitte melden Sie sich an, um Dateien herunterzuladen.", {
      status: 401,
    });
  }

  const { fileId } = await params;
  const result = getDownloadableFileForUser(user, fileId);

  if (!result.ok) {
    if (result.reason === "NOT_DELIVERED") {
      return new Response(
        "Diese Datei ist noch nicht freigegeben. Der Download wird bereitgestellt, sobald der Auftrag abgeschlossen ist.",
        { status: 409 },
      );
    }

    return new Response("Die angeforderte Datei wurde nicht gefunden.", {
      status: 404,
    });
  }

  const { file } = result;
  const encodedFileName = encodeURIComponent(file.fileName);

  return new Response(file.downloadContent, {
    status: 200,
    headers: {
      "Content-Type": file.mimeType || "application/octet-stream",
      "Content-Length": String(Buffer.byteLength(file.downloadContent, "utf8")),
      "Content-Disposition": `attachment; filename*=UTF-8''${encodedFileName}`,
      "Cache-Control": "private, no-store",
    },
  });
}
