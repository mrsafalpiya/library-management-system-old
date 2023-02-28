import type { Handle } from "@sveltejs/kit";
import { redirect } from "sveltekit-flash-message/server";

export const handle = (async ({ event, resolve }) => {
  if (event.url.pathname.startsWith("/member")) {
    if (!event.cookies.get("jwt")) {
      const message = { type: "error", message: "You must login first" } as const;
      throw redirect(302, "/login", message, event);
    }

    const res = await event.fetch("/api/v1/user");

    if (!res.ok) {
      event.cookies.delete("jwt", {
        secure: false,
      });
      const message = { type: "error", message: "You must login first" } as const;
      throw redirect(302, "/login", message, event);
    }

    const data = await res.json();

    let userIDType: string = data.id_type;
    event.locals.userIDType = userIDType;
    event.locals.userName = data.name;

    // Users get access only to their respective ID type.

    if (event.url.pathname.startsWith("/member/student") && userIDType != "student") {
      throw redirect(302, "/member");
    }
    if (event.url.pathname.startsWith("/member/staff") && userIDType != "staff") {
      throw redirect(302, "/member");
    }
    if (event.url.pathname.startsWith("/member/teacher") && userIDType != "teacher") {
      throw redirect(302, "/member");
    }

    // Proper redirects

    if (event.url.pathname == "/member") {
      throw redirect(302, `/member/${userIDType}/dashboard`);
    }

    switch (event.url.pathname) {
      case "/member/student":
      case "/member/staff":
      case "/member/teacher":
        throw redirect(302, `/member/${userIDType}/dashboard`);
    }
  }

  const response = await resolve(event);
  return response;
}) satisfies Handle;
