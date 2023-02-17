import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ fetch }) => {
  let response = await fetch("/api/v1/user", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  // Redirect if not logged in
  if (response.status != 200) {
    throw redirect(302, "/logout");
  }

  let json = await response.json();

  response = await fetch(`/api/v1/${json.id_type.toLowerCase()}/dashboard`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  json = await response.json();

  return json;
}) satisfies LayoutServerLoad;
