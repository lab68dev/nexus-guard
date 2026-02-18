"use server";

import { revalidatePath } from "next/cache";
import { proxy } from "@/lib/proxy";

/* ─────────────────────────────────────────────
   Server Action — Create Safety Policy
   ───────────────────────────────────────────── */

export async function createPolicy(formData: FormData) {
  const payload = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    type: formData.get("type") as string,
    severity: formData.get("severity") as string,
    enabled: formData.get("enabled") === "on",
    config: {},
  };

  await proxy("/api/v1/policies", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  revalidatePath("/dashboard/policies");
}

export async function togglePolicy(id: string, enabled: boolean) {
  await proxy(`/api/v1/policies/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ enabled }),
  });

  revalidatePath("/dashboard/policies");
}

export async function deletePolicy(id: string) {
  await proxy(`/api/v1/policies/${id}`, {
    method: "DELETE",
  });

  revalidatePath("/dashboard/policies");
}
