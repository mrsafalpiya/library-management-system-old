import type { PageServerLoad } from "./$types";

export const load = (async (event) => {
  // Get profile details
  const res = await event.fetch("/api/v1/student/profile");
  const data = await res.json();

  return data;
}) satisfies PageServerLoad;
