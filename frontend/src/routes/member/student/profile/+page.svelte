<script lang="ts">
  import profile from "$lib/images/profile.jpg";
  import UpdateDetails from "./components/UpdateDetails.svelte";

  import type { PageData } from "./$types";
  import ChangePassword from "./components/ChangePassword.svelte";
  export let data: PageData;
</script>

<h1 class="mb-4 text-4xl font-semibold lg:ml-8">Profile</h1>

<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="flex flex-col flex-wrap justify-around gap-8 sm:flex-row">
  <div class="flex basis-[200px] flex-col items-center gap-4">
    <h2 class="mt-8 text-2xl">Profile Picture</h2>

    <img class="w-full max-w-[200px]" src={profile} alt="Profile" />

    <form class="flex max-w-xs flex-col gap-4">
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Pick a new picture</span>
        </label>
        <input
          type="file"
          class="file-input-bordered file-input file-input-xs w-full max-w-xs"
          required
        />
      </div>

      <button class="btn-primary btn w-max self-center">Update</button>
    </form>
  </div>

  <div class="flex basis-1/3 flex-col items-center">
    <UpdateDetails currentDetails={data} />
  </div>

  <div class="flex basis-1/3 flex-col items-center">
    <ChangePassword />
  </div>
</div>
