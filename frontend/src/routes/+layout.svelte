<script>
  import "../app.postcss";
  import ErrorMsg from "$lib/components/ErrorMsg.svelte";
  import { initFlash } from "sveltekit-flash-message/client";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import Spinner from "$lib/components/Spinner.svelte";

  const flash = initFlash(page);

  let isLoading = true;

  onMount(() => (isLoading = false));
</script>

<!-- Loading screen -->
{#if isLoading}
  <Spinner />
{/if}

<!-- Error Message -->
{#if $flash}
  <ErrorMsg {flash} />
{/if}

<slot />
