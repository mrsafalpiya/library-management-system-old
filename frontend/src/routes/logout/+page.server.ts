import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  event.cookies.delete("jwt", {
    path: "/",
    secure: false,
  });
  throw redirect(302, "/login");
}) satisfies PageServerLoad;
