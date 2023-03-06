<script lang="ts">
  import { page } from "$app/stores";

  import { getFlash } from "sveltekit-flash-message/client";

  const flash = getFlash(page);

  let isFetching = false;

  export let currentDetails: any;

  async function updateDetails(event: SubmitEvent) {
    isFetching = true;

    const formData = new FormData(event.target as HTMLFormElement);

    const address = formData.get("address") || "";
    const contact = formData.get("contact") || "";
    const email = formData.get("email") || "";

    const res = await fetch("/api/v1/student/profile/details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        contact,
        email,
      }),
    });

    if (!res.ok) {
      $flash = { type: "error", message: "unexpected error" };
      return;
    }

    $flash = { type: "success", message: "profile details updated successfully" };
    isFetching = false;
  }
</script>

<h2 class="mt-8 mb-2 text-2xl">Update Details</h2>

<!-- svelte-ignore a11y-label-has-associated-control -->
<form class="flex w-full max-w-xs flex-col gap-4" on:submit|preventDefault={updateDetails}>
  <div>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Address</span>
      </label>
      <input
        type="text"
        placeholder="Enter your address here"
        class="input-bordered input w-full max-w-xs"
        name="address"
        value={currentDetails.address}
      />
    </div>

    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Contact</span>
      </label>
      <input
        type="text"
        placeholder="Enter your contact here"
        class="input-bordered input w-full max-w-xs"
        name="contact"
        value={currentDetails.contact}
      />
    </div>

    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Email</span>
      </label>
      <input
        type="email"
        placeholder="Enter your email here"
        class="input-bordered input w-full max-w-xs"
        name="email"
        value={currentDetails.email}
      />
    </div>
  </div>

  <button class="btn-primary btn w-max self-center" class:loading={isFetching}>Update</button>
</form>
