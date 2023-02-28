import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  // Redirect to proper ID type
  let userIDType = event.locals.userIDType;
  throw redirect(302, `/member/${userIDType}`);
}) satisfies PageServerLoad;
