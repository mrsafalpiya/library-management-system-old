import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ parent, url }) => {
  const { idType } = await parent();

  if (!url.pathname.startsWith(`/member/${idType}`)) {
    throw redirect(302, `/member/${idType}/dashboard`);
  }
}) satisfies LayoutServerLoad;
