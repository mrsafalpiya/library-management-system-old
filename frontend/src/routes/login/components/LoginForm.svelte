<script lang="ts">
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import { initFlash, updateFlash } from "sveltekit-flash-message/client";

  async function fetchIDTypes() {
    const res = await fetch("/api/v1/id-types");
    if (!res.ok) {
      $flash = { type: "error", message: "Could not get ID types" };
      throw "Could not get ID types";
    }

    const data = await res.json();
    return data.id_types;
  }

  const flash = initFlash(page);

  let isLoading = false;
</script>

<form
  class="flex flex-col gap-4"
  method="POST"
  on:submit={() => {
    $flash = undefined;
    isLoading = true;
  }}
  use:enhance={() =>
    ({ update }) => {
      updateFlash(page, update);
      isLoading = false;
    }}
>
  <div>
    <select class="select-bordered select w-full max-w-xs" name="id-type">
      {#await fetchIDTypes()}
        <option selected disabled>Loading...</option>
      {:then idTypes}
        {#each idTypes as idType}
          <option value={idType.id}>{idType.id_type}</option>
        {/each}
      {:catch}
        <option selected disabled>No ID types available</option>
      {/await}
    </select>

    <div class="form-control w-full max-w-xs">
      <label class="label" for="id-num">
        <span class="label-text">Student ID</span>
      </label>
      <input
        type="text"
        placeholder="Enter Student ID here"
        name="id-num"
        class="input-bordered input w-full max-w-xs"
        autofocus
        required
      />
    </div>

    <div class="form-control w-full max-w-xs">
      <label class="label" for="password">
        <span class="label-text">Password</span>
      </label>
      <input
        type="password"
        placeholder="Enter your password here"
        name="password"
        class="input-bordered input w-full max-w-xs"
        required
      />
    </div>
  </div>

  <button type="submit" class="btn-primary btn m-auto" class:loading={isLoading}>Login</button>
</form>
