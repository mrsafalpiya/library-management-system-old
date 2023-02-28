// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface PageData {
      flash?: { type: "success" | "error"; message: string };
    }
    // interface Error {}
    interface Locals {
      userName: string;
      userIDType: string;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
