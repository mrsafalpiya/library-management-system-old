import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";

export let usersTabSelected: Writable<number>;

if (browser) {
  const storedUsersTabSelected = localStorage.getItem("usersTabSelected");
  usersTabSelected = writable(parseInt(storedUsersTabSelected || "0"));

  usersTabSelected.subscribe((value) => localStorage.setItem("usersTabSelected", value.toString()));
}
