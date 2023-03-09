import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  const res = await event.fetch(`/api/v1/profile/student/${event.params.studentIDNum}`);
  if (!res.ok) {
    if (res.status == 404) {
      throw error(404, "Not found");
    }
    throw error(500, "Internal server error");
  }

  const data = await res.json();
  return data;
}) satisfies PageServerLoad;
