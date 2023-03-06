<script lang="ts">
  import { faCircleCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa/src/fa.svelte";

  export let flash: any;

  function handleOnClick(e: Event) {
    const target = e.target as HTMLElement;
    target.parentElement?.parentElement?.classList.add("removing");
    setTimeout(() => {
      $flash = undefined;
    }, 100);
  }
</script>

<div class="fixed inset-x-0 top-4 z-50 bg-transparent">
  <div class="mx-auto w-max">
    <button
      class="btn flex gap-2 normal-case"
      class:btn-success={$flash.type == "success"}
      class:btn-error={$flash.type == "error"}
      on:click={(e) => handleOnClick(e)}
    >
      <Fa
        class="inline-block"
        icon={$flash.type == "success" ? faCircleCheck : faTriangleExclamation}
      />
      <p class="first-letter:capitalize">{$flash.message}</p>
    </button>
  </div>
</div>

<style>
  :global(.removing) {
    animation: fadeOut 0.1s;
    animation-timing-function: ease-in-out;
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>
