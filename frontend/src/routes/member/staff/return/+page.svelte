<script lang="ts">
  import BookDetails from "./components/BookDetails.svelte";
  import CopyRegisterId from "./components/CopyRegisterID.svelte";

  let bookDetails: any | null = null;
  let bookRegisterIDInput: HTMLInputElement;
</script>

<h1 class="mb-4 text-4xl font-semibold lg:ml-8">Return a Book</h1>

<CopyRegisterId bind:bookDetails bind:bookRegisterIDInput />

{#if bookDetails}
  <BookDetails bind:bookDetails bind:bookRegisterIDInput />
{/if}
