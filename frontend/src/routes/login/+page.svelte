<script lang="ts">
  import type { PageServerData } from "./$types";
  import { initFlash } from "sveltekit-flash-message/client";
  import { page } from "$app/stores";

  import  primeCollegeLogo  from "$lib/images/prime-college.jpg";

  import LoginForm from "./components/LoginForm.svelte";
  import ErrorMsg from "./components/ErrorMsg.svelte";

  export let data: PageServerData;

  const flash = initFlash(page);
</script>

<!-- Error Message -->
{#if $flash}
  <ErrorMsg {flash} />
{/if}

<div class="flex h-[100dvh] flex-col items-center justify-center gap-4">
  <img
    src={primeCollegeLogo}
    alt="Prime College"
    class="w-full max-w-[250px]"
  />

  <h1 class="text-4xl font-bold">Login</h1>

  <LoginForm idTypes={data.id_types} />
</div>
