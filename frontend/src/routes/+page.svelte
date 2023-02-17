<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;

  import { goto } from "$app/navigation";

  let errorMessage = "";

  let isLoading = false;

  const idTypes: { id: number; id_type: string }[] = data.id_types;

  let selectedIdType = idTypes[0];
  let idNum = "";
  let password = "";

  async function submitForm() {
    isLoading = true;

    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_type: selectedIdType.id,
        id_num: idNum,
        password: password,
      }),
    });

    if (response.status != 200) {
      const data = await response.json();
      errorMessage = data.error;
      isLoading = false;
      return;
    }

    await goto("/member");
    isLoading = false;
  }
</script>

{#if isLoading}
  <div class="fixed inset-x-0 top-4 z-50 bg-transparent">
    <div class="mx-auto w-max">
      <button class="loading btn-primary btn">loading</button>
    </div>
  </div>
{/if}

<form
  class="flex h-[100dvh] flex-col items-center justify-center gap-4"
  on:submit|preventDefault={submitForm}
>
  <img
    src="https://www.prime.edu.np/wp-content/uploads/2022/04/Prime-College-Affiliated-to-TU-Logo.jpg"
    alt="prime college"
    class="w-full max-w-[250px]"
  />
  {#if errorMessage != ""}
    <div class="alert alert-error absolute top-4 w-max shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 flex-shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span class="first-letter:capitalize">{errorMessage}</span>
      </div>
    </div>
  {/if}
  <h1 class="text-4xl font-bold">Login</h1>
  <div>
    <select
      class="select-bordered select w-full max-w-xs"
      name="id-type"
      bind:value={selectedIdType}
    >
      {#each idTypes as idType, i}
        {#if i === 0}
          <option selected value={idType}>{idType.id_type}</option>
        {:else}
          <option value={idType}>{idType.id_type}</option>
        {/if}
      {/each}
    </select>

    <div class="form-control w-full max-w-xs">
      <label class="label" for="id-num">
        <span class="label-text">{selectedIdType.id_type} ID</span>
      </label>
      <input
        type="text"
        placeholder="Enter {selectedIdType.id_type} ID here"
        name="id-num"
        class="input-bordered input w-full max-w-xs"
        bind:value={idNum}
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
        bind:value={password}
        required
      />
    </div>
  </div>

  <button type="submit" class="btn-primary btn">Login</button>
</form>
