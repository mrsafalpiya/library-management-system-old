<script lang="ts">
  import BookDetails from "./components/BookDetails.svelte";
  import CopyRegisterId from "./components/CopyRegisterID.svelte";

  let bookDetails: any | null = null;
  let bookRegisterIDInput: HTMLInputElement;
</script>

<CopyRegisterId bind:bookDetails bind:bookRegisterIDInput />

{#if bookDetails}
  <BookDetails bind:bookDetails bind:bookRegisterIDInput />
{/if}
