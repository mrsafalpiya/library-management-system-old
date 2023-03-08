<script lang="ts">
  import BookSearchAndDetails from "../components/BookSearchAndDetails.svelte";
  import { page } from "$app/stores";

  import { getFlash } from "sveltekit-flash-message/client";
  const flash = getFlash(page);

  let bookDetails: any | null = null;
  let bookRegisterIDInput: HTMLInputElement;

  async function handleReturn(event: SubmitEvent) {
    const element = event.target as HTMLFormElement;
    const submitBtn = element.getElementsByClassName("btn")[0];
    submitBtn.classList.add("loading");

    const res = await fetch("/api/v1/books/return", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: bookDetails.borrower_id,
        copy_id: bookDetails.copy_id,
      }),
    });

    const data = await res.json();
    bookDetails = data;

    if (!res.ok) {
      if (res.status == 500) {
        $flash = { type: "error", message: "could not return the book" };
      } else {
        $flash = { type: "error", message: data.error };
      }
    } else {
      $flash = { type: "success", message: "book returned successfully" };
    }

    bookDetails = null;
    submitBtn.classList.remove("loading");

    bookRegisterIDInput.value = "";
    bookRegisterIDInput.focus();
  }
</script>

<h1 class="mb-4 text-4xl font-semibold lg:ml-8">Return a Book</h1>

<BookSearchAndDetails bind:bookDetails bind:bookRegisterIDInput />

{#if bookDetails}
  <form on:submit|preventDefault={(e) => handleReturn(e)}>
    <button class="btn-primary btn mt-4">Return</button>
  </form>
{/if}
