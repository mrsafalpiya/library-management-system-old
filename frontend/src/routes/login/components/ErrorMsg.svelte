<script lang="ts">
  import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa/src/fa.svelte";

  export let flash: any;
</script>

<div class="fixed inset-x-0 top-4 z-50 bg-transparent">
  <div class="mx-auto w-max">
    <button
      class="btn flex gap-2 normal-case"
      class:btn-error={$flash.type == "error"}
      on:click={() => ($flash = undefined)}
    >
      <Fa class="inline-block" icon={faTriangleExclamation} />
      <p class="first-letter:capitalize">{$flash.message}</p>
    </button>
  </div>
</div>
