import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  // Check if cookies are available
  if (event.cookies.get("jwt")) {
    throw redirect(302, "/member");
  } else {
    throw redirect(302, "/login");
  }
}) satisfies PageServerLoad;
