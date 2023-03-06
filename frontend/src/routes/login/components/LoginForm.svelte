<script lang="ts">
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import { initFlash, updateFlash } from "sveltekit-flash-message/client";
  import studentsIcon from "$lib/images/students_icon.png";

  type IDType = {
    name: string;
    value: string;
  };

  const idTypes: IDType[] = [
    {
      name: "Student",
      value: "student",
    },
    {
      name: "Staff",
      value: "staff",
    },
    {
      name: "Teacher",
      value: "teacher",
    },
  ];
  let selectedIDTypeValue = idTypes[0].value;

  function IDNameFromValue(idTypes: IDType[], selectedIDTypeValue: string): string | undefined {
    let selectedIDType = idTypes.find((id) => id.value == selectedIDTypeValue);
    return selectedIDType?.name;
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
  <img src={studentsIcon} class="absolute bottom-0 right-0 -z-10 w-[100px]" alt="students" />

  <div>
    <select
      class="select-bordered select w-full max-w-xs"
      name="id-type"
      bind:value={selectedIDTypeValue}
    >
      {#each idTypes as idType}
        <option value={idType.value}>{idType.name}</option>
      {/each}
    </select>

    <div class="form-control w-full max-w-xs">
      <label class="label" for="id-num">
        <span class="label-text">{IDNameFromValue(idTypes, selectedIDTypeValue)} ID</span>
      </label>
      <input
        type="text"
        placeholder="Enter {IDNameFromValue(idTypes, selectedIDTypeValue)} ID here"
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

  <button type="submit" class="btn btn-primary m-auto" class:loading={isLoading}>Login</button>
</form>
