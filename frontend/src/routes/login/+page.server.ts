import {dev} from "$app/environment";
import { fail, redirect } from "@sveltejs/kit";
import { setFlash } from "sveltekit-flash-message/server";
import type { PageServerLoad, Actions } from "./$types";

export const load = (async (event) => {
  // Check if cookies are available
  if (event.cookies.get("jwt")) {
    throw redirect(302, "/member");
  }
}) satisfies PageServerLoad;

export const actions = {
  default: async (event) => {
    const formData = await event.request.formData();

    const idType = formData.get("id-type");
    const idNum = formData.get("id-num");
    const password = formData.get("password");

    const res = await event.fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_type: Number(idType),
        id_num: idNum,
        password: password,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      setFlash({ type: "error", message: data.error }, event);
      return fail(res.status);
    }

    event.cookies.set("jwt", data.token, {
      path: "/",
      expires: new Date(data.expires),
      secure: !dev,
      httpOnly: true,
    });

    throw redirect(302, "/member");
  },
} satisfies Actions;
