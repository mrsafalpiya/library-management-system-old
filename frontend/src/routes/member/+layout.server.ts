import type { LayoutServerLoad } from "./$types";

export const load = (async (event) => {
  return {
    userName: event.locals.userName,
    userIDType: event.locals.userIDType,
  };
}) satisfies LayoutServerLoad;
