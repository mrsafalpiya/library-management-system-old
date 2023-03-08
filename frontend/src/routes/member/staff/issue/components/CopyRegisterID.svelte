<script lang="ts">
  import { page } from "$app/stores";

  import { getFlash } from "sveltekit-flash-message/client";
  const flash = getFlash(page);

  export let studentID: number;
  export let studentDetails: any;

  let copyRegisterID = "";
  let issueDurationDays = "30";
  let bookDetails: any | null = null;

  let bookRegistrationIDTextBox: HTMLInputElement;

  async function updateBorrows() {
    const res = await fetch("/api/v1/user/student/" + studentDetails.user.id_num);
    const data = await res.json();
    if (!res.ok) {
      if (res.status == 500) {
        $flash = { type: "error", message: "could not fetch student data" };
      } else {
        $flash = { type: "error", message: data.error };
      }
      return;
    }

    studentDetails = data;
    studentID = parseInt(data.user.id);
  }

  async function handleCopyRegistrationIDSearch(event: SubmitEvent) {
    const element = event.target as HTMLFormElement;
    const submitBtn = element.getElementsByClassName("btn")[0];
    submitBtn.classList.add("loading");

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
    if (data.book.is_borrowed) {
      $flash = { type: "error", message: "the given copy of the book is already issued" };
      bookDetails = undefined;
      submitBtn.classList.remove("loading");
      return;
    }

    $flash = undefined;
    bookDetails = data.book;
    submitBtn.classList.remove("loading");
  }

  async function handleIssueSubmit(event: SubmitEvent) {
    const element = event.target as HTMLFormElement;
    const submitBtn = element.getElementsByClassName("btn")[0];
    submitBtn.classList.add("loading");

    const res = await fetch("/api/v1/books/issue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: studentID,
        copy_id: bookDetails.copy_id,
        issue_duration_days: parseInt(issueDurationDays),
      }),
    });

    const data = await res.json();
    bookDetails = data;

    if (!res.ok) {
      if (res.status == 500) {
        $flash = { type: "error", message: "could not issue the book" };
      } else {
        $flash = { type: "error", message: data.error };
      }
    } else {
      $flash = { type: "success", message: "book issued successfully" };
    }

    copyRegisterID = "";
    bookDetails = null;

    submitBtn.classList.remove("loading");
    await updateBorrows();

    bookRegistrationIDTextBox.focus();
  }
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<!-- svelte-ignore a11y-autofocus -->
<form
  class="form-control w-full max-w-md"
  on:submit|preventDefault={(e) => handleCopyRegistrationIDSearch(e)}
>
  <label class="label">
    <span class="label-text">Book Registration ID</span>
  </label>
  <div class="flex items-center gap-3">
    <input
      type="text"
      placeholder="Scan here"
      class="input-bordered input w-full max-w-xs"
      name="copy-registration-id"
      required
      bind:value={copyRegisterID}
      autofocus
      bind:this={bookRegistrationIDTextBox}
    />
    <button class="btn-primary btn">Search</button>
  </div>
</form>

<!-- svelte-ignore a11y-autofocus -->
{#if bookDetails}
  <p class="mt-4">Title: {bookDetails.title}</p>
  <p>Publisher: {bookDetails.publisher}</p>
  <p>Author: {bookDetails.author}</p>

  <form class="form-control w-full max-w-md" on:submit|preventDefault={(e) => handleIssueSubmit(e)}>
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

      <button class="btn-primary btn" autofocus>Issue</button>
    </div>
  </form>
{/if}
