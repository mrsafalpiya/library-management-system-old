import type { LayoutServerLoad } from "./$types";

export const load = (async (event) => {
  const res = await event.fetch("/api/v1/student/dashboard");

  if (!res.ok) {
    // TODO: Handle error
  }

  const data = await res.json();
  return data;
}) satisfies LayoutServerLoad;
