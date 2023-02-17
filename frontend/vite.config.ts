import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";

const config: UserConfig = {
  plugins: [sveltekit()],
  server: {
    proxy: {
      "/api/v1": "http://0.0.0.0:8080",
    },
  },
};

export default config;
