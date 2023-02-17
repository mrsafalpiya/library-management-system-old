import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch }) => {
  await fetch("/api/v1/auth/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  throw redirect(302, "/");
}) satisfies PageServerLoad;
