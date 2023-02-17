<script lang="ts">
  import { usersTabSelected } from "./stores";
  import profile from "$lib/images/profile.jpg";

  let tabs = [
    {
      title: "Students",
      path: "/api/v1/users/1",
    },
    {
      title: "Teachers",
      path: "/api/v1/users/2",
    },
  ];

  async function fetchUsers(index: number) {
    const response = await fetch(tabs[index].path);
    const obj = await response.json();
    return obj;
  }
</script>

<div class="tabs tabs-boxed mb-4 bg-transparent">
  {#each tabs as tab, i}
    <button
      class="tab"
      class:tab-active={$usersTabSelected == i}
      on:click={() => ($usersTabSelected = i)}
    >
      {tab.title}
    </button>
  {/each}
</div>

<div class="w-full overflow-x-auto">
  <table class="table w-full">
    <!-- head -->
    <thead>
      <tr>
        <th>Name</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#await fetchUsers($usersTabSelected)}
        <tr>
          <td class="w-full">
            <p class="text-center">Loading...</p>
          </td>
        </tr>
      {:then users}
        {#each users as user}
          <tr>
            <td>
              <div class="flex items-center space-x-3">
                <div class="flex items-center space-x-3">
                  <div class="avatar">
                    <div class="mask mask-squircle h-12 w-12">
                      <img src={profile} />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{user.name}</div>
                    <div class="text-sm opacity-50">{user.batch.name}</div>
                  </div>
                </div>
              </div>
            </td>
            <th>
              <button class="btn-ghost btn-xs btn">details</button>
            </th>
          </tr>
        {/each}
      {/await}
    </tbody>
    <tfoot>
      <tr>
        <th>Name</th>
        <th />
      </tr>
    </tfoot>
  </table>
</div>
