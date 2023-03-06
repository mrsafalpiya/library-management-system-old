<script lang="ts">
  import { page } from "$app/stores";

  import { getFlash } from "sveltekit-flash-message/client";

  const flash = getFlash(page);

  let isFetching = false;

  async function updatePassword(event: SubmitEvent) {
    isFetching = true;

    const formData = new FormData(event.target as HTMLFormElement);

    const oldPassword = formData.get("old-password");
    const newPassword = formData.get("new-password");
    const newPasswordConfirm = formData.get("new-password-confirm");
    if (newPassword != newPasswordConfirm) {
      $flash = { type: "error", message: "passwords do not match" };
      isFetching = false;
      return;
    }

    const res = await fetch("/api/v1/student/profile/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });

    if (!res.ok) {
      $flash = { type: "error", message: "unexpected error" };
      return;
    }

    $flash = { type: "success", message: "password changed successfully" };
    isFetching = false;
  }
</script>

<h2 class="mt-8 mb-2 text-2xl">Change Password</h2>

<!-- svelte-ignore a11y-label-has-associated-control -->
<form class="flex max-w-xs flex-col gap-4" on:submit|preventDefault={updatePassword}>
  <div>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Old Password</span>
      </label>
      <input
        type="password"
        placeholder="Your old password here"
        class="input-bordered input w-full max-w-xs"
        name="old-password"
        required
      />
    </div>

    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">New Password</span>
      </label>
      <input
        type="password"
        placeholder="Your new password here"
        class="input-bordered input w-full max-w-xs"
        name="new-password"
        required
      />
    </div>

    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Confirm New Password</span>
      </label>
      <input
        type="password"
        placeholder="Type new password again"
        class="input-bordered input w-full max-w-xs"
        name="new-password-confirm"
        required
      />
    </div>
  </div>

  <button class="btn-primary btn w-max self-center" class:loading={isFetching}>Update</button>
</form>
