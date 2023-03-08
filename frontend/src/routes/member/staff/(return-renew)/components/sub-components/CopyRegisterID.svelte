<script lang="ts">
  import { page } from "$app/stores";

  import { getFlash } from "sveltekit-flash-message/client";
  const flash = getFlash(page);

  export let bookDetails: any | null;
  export let bookRegisterIDInput: HTMLInputElement;

  async function handleCopyRegisterIDSearch(event: SubmitEvent) {
    const element = event.target as HTMLFormElement;
    const submitBtn = element.getElementsByClassName("btn")[0];
    submitBtn.classList.add("loading");

    const formData = new FormData(element);
    const copyRegisterID = formData.get("copy-register-id");

    const res = await fetch("/api/v1/books/copy/" + copyRegisterID);
    if (!res.ok) {
      if (res.status == 500) {
        $flash = { type: "error", message: "could not fetch student data" };
      } else {
        const data = await res.json();
        $flash = { type: "error", message: data.error };
      }

      submitBtn.classList.remove("loading");
      bookDetails = null;
      return;
    }

    const data = await res.json();
    if (!data.book.is_borrowed) {
      $flash = { type: "error", message: "the given copy of the book was never borrowed!" };
      submitBtn.classList.remove("loading");
      bookDetails = null;
      return;
    }

    $flash = undefined;
    bookDetails = data.book;
    submitBtn.classList.remove("loading");
  }
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<!-- svelte-ignore a11y-autofocus -->
<form
  class="form-control w-full max-w-md"
  on:submit|preventDefault={(e) => handleCopyRegisterIDSearch(e)}
>
  <label class="label">
    <span class="label-text">Book Register ID</span>
  </label>
  <div class="flex items-center gap-3">
    <input
      type="text"
      placeholder="Scan here"
      class="input-bordered input w-full max-w-xs"
      name="copy-register-id"
      required
      autofocus
      bind:this={bookRegisterIDInput}
    />
    <button class="btn-primary btn">Search</button>
  </div>
</form>
