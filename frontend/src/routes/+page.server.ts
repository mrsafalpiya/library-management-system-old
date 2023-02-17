import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch }) => {
  // Check if already logged in
  let res = await fetch("/api/v1/user", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (res.status == 200) {
    let json = await res.json();
    let idType = json.id_type.toLowerCase();
    throw redirect(302, `/member/${idType}/dashboard`);
  }

  res = await fetch("/api/v1/id-types");
  return await res.json();
}) satisfies PageServerLoad;
