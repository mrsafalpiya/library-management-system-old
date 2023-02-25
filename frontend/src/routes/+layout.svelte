<script>
  import "../app.postcss";
  import ErrorMsg from "$lib/components/ErrorMsg.svelte";
  import { initFlash } from "sveltekit-flash-message/client";
  import { page } from "$app/stores";

  const flash = initFlash(page);
</script>

<!-- Error Message -->
{#if $flash}
  <ErrorMsg {flash} />
{/if}

<slot />
