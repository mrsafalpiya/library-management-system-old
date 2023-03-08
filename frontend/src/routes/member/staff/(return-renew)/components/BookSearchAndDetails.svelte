<script lang="ts">
  import BookDetails from "./sub-components/BookDetails.svelte";
  import CopyRegisterId from "./sub-components/CopyRegisterID.svelte";

  export let bookDetails: any | null = null;
  export let bookRegisterIDInput: HTMLInputElement;
</script>

<CopyRegisterId bind:bookDetails bind:bookRegisterIDInput />

{#if bookDetails}
  <BookDetails bind:bookDetails />
{/if}
