"use server";

import { revalidatePath } from "next/cache";
import { proxy } from "@/lib/proxy";

/* ─────────────────────────────────────────────
   Server Action — Update Organization Settings
   ───────────────────────────────────────────── */

export async function updateSettings(formData: FormData) {
  const payload = {
    orgName: formData.get("orgName") as string,
    slug: formData.get("slug") as string,
    tokenBudget: Number(formData.get("tokenBudget")),
    enforceTokenBudget: formData.get("enforceTokenBudget") === "on",
    upstreamTimeout: Number(formData.get("upstreamTimeout")),
    maxBodySize: Number(formData.get("maxBodySize")),
  };

  await proxy("/api/v1/settings", {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  revalidatePath("/dashboard/settings");
}
