import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  // Redirect to proper ID type
  let idType = event.locals.idType;
  throw redirect(302, `/member/${idType}`);
}) satisfies PageServerLoad;
