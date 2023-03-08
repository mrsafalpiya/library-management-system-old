<script lang="ts">
  import BookSearchAndDetails from "../components/BookSearchAndDetails.svelte";
  import { page } from "$app/stores";

  import { getFlash } from "sveltekit-flash-message/client";
  const flash = getFlash(page);

  let bookDetails: any | null = null;
  let bookRegisterIDInput: HTMLInputElement;

  let issueDurationDays = "30";

  async function handleRenew(event: SubmitEvent) {
    const element = event.target as HTMLFormElement;
    const submitBtn = element.getElementsByClassName("btn")[0];
    submitBtn.classList.add("loading");

    const res = await fetch("/api/v1/books/renew", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: bookDetails.borrower_id,
        copy_id: bookDetails.copy_id,
        issue_duration_days: issueDurationDays,
      }),
    });

    const data = await res.json();
    bookDetails = data;

    if (!res.ok) {
      if (res.status == 500) {
        $flash = { type: "error", message: "could not renew the book" };
      } else {
        $flash = { type: "error", message: data.error };
      }
    } else {
      $flash = { type: "success", message: "book renewed successfully" };
    }

    bookDetails = null;
    submitBtn.classList.remove("loading");

    bookRegisterIDInput.value = "";
    bookRegisterIDInput.focus();
  }
</script>

<h1 class="mb-4 text-4xl font-semibold lg:ml-8">Renew a Book</h1>

<BookSearchAndDetails bind:bookDetails bind:bookRegisterIDInput />

<!-- svelte-ignore a11y-autofocus -->
{#if bookDetails}
  <form class="form-control mt-4 w-full max-w-md" on:submit|preventDefault={(e) => handleRenew(e)}>
    <div class="flex items-center gap-3">
      <select
        class="select-bordered select w-full max-w-xs"
        name="issue-duration-days"
        bind:value={issueDurationDays}
      >
        <option value="7">7 Days</option>
        <option value="10">10 Days</option>
        <option value="30" selected>30 Days</option>
        <option value="45">45 Days</option>
        <option value="60">60 Days</option>
        <option value="90">90 Days</option>
      </select>

      <button class="btn-primary btn" autofocus>Renew</button>
    </div>
  </form>
{/if}
