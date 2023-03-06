<script lang="ts">
  import Loading from "$lib/components/Loading.svelte";
  import profile from "$lib/images/profile.jpg";

  import Pagination from "$lib/components/Pagination.svelte";
  import SortIcon from "$lib/components/SortIcon.svelte";

  let pageNum: number = 1;
  let pageSize: number = 10;
  let pagesCount: number;
  let totalRecords: number | null = null;
  let pageRecordsCount: number | null = null;
  let searchKeyword = "";

  let tabs = [
    {
      title: "Students",
      path: "/api/v1/user/students",
    },
    {
      title: "Staffs",
      path: "/api/v1/user/staffs",
    },
  ];

  let usersTabSelected = 0;

  async function fetchUsers(
    index: number,
    pageNum: number,
    pageSize: number,
    sortQuery: string,
    searchKeyword: string
  ) {
    const response = await fetch(
      tabs[index].path +
        `?page=${pageNum}&size=${pageSize}&sort=${sortQuery}&search=${searchKeyword}`
    );
    const obj = await response.json();

    pageNum = obj.metadata.current_page;
    pageSize = obj.metadata.page_size;
    pagesCount = obj.metadata.last_page;
    totalRecords = obj.metadata.total_records;
    pageRecordsCount = obj.metadata.page_records_count;

    return obj.members;
  }

  let sortQuery = "name-asc";

  function toggleSort(label: string) {
    switch (sortQuery) {
      case label + "-asc":
        sortQuery = label + "-desc";
        break;
      case label + "-desc":
        sortQuery = label + "-asc";
        break;
      default:
        sortQuery = label + "-asc";
    }
  }

  let tempSearchKeyword = "";

  function copyIDNumToClipboard(event: MouseEvent) {
    const element = event.target as HTMLElement;
    element.classList.add("tooltip-success");

    navigator.clipboard.writeText(element.innerText);

    element.setAttribute("data-tip", "Copied to clipboard");
  }

  const defaultTooltipOnIDNum = "Click to copy";

  function resetTooltip(event: MouseEvent) {
    const element = event.target as HTMLElement;
    element.classList.remove("tooltip-success");

    setTimeout(() => {
      element.setAttribute("data-tip", defaultTooltipOnIDNum);
    }, 200);
  }
</script>

<h1 class="mb-4 text-4xl font-semibold lg:ml-8">Members</h1>

<div class="tabs tabs-boxed mb-4 bg-transparent">
  {#each tabs as tab, i}
    <button
      class="tab"
      class:tab-active={usersTabSelected == i}
      on:click={() => (usersTabSelected = i)}
    >
      {tab.title}
    </button>
  {/each}
</div>

<div>
  <div class="mb-4 flex flex-col justify-between gap-4 min-[450px]:flex-row">
    <select class="select-bordered select w-full min-[450px]:w-max" bind:value={pageSize}>
      <option default value={10}>Show 10 entries</option>
      <option value={25}>Show 25 entries</option>
      <option value={50}>Show 50 entries</option>
      <option value={100}>Show 100 entries</option>
    </select>

    <form on:submit|preventDefault={() => (searchKeyword = tempSearchKeyword)}>
      <input
        type="text"
        placeholder="Search by name"
        class="search input-bordered input w-full pl-9 min-[450px]:w-max"
        bind:value={tempSearchKeyword}
      />
    </form>
  </div>

  {#await fetchUsers(usersTabSelected, pageNum, pageSize, sortQuery, searchKeyword)}
    <Loading />
  {:then users}
    <div class="overflow-x-auto">
      <table class="table-compact table sm:w-full">
        <thead>
          <tr>
            <th class="w-10">#</th>
            <th class="cursor-pointer" on:click={() => toggleSort("name")}>
              <span class="mr-1">Name</span>
              <SortIcon label="title" {sortQuery} />
            </th>
            {#if tabs[usersTabSelected].title == "Students"}
              <th>
                <span class="mr-1">Batch</span>
              </th>
            {/if}
            <th class="w-12 text-center">
              <span>Actions</span>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {#each users as user, i}
            <tr>
              <th>{i + 1}</th>
              <td>
                <div class="flex items-center space-x-3">
                  <div class="flex items-center space-x-3">
                    <div class="avatar">
                      <div class="mask mask-squircle h-12 w-12">
                        <img src={profile} alt="profile" />
                      </div>
                    </div>
                    <div>
                      <div class="font-bold">{user.name}</div>
                      <button
                        class="tooltip tooltip-right cursor-pointer text-sm text-gray-400"
                        data-tip={defaultTooltipOnIDNum}
                        on:click={(e) => copyIDNumToClipboard(e)}
                        on:mouseleave={(e) => resetTooltip(e)}
                      >
                        {user.id_num}
                      </button>
                    </div>
                  </div>
                </div>
              </td>
              {#if tabs[usersTabSelected].title == "Students"}
                <td class="whitespace-normal">{user.batch}</td>
              {/if}
              <td class="text-center text-primary-focus">
                <button class="btn btn-ghost btn-xs">Visit Profile</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <Pagination bind:pageNum bind:pagesCount {totalRecords} {pageSize} {pageRecordsCount} />
  {:catch}
    <p class="text-center text-red-500">Oops! Something went wrong.</p>
  {/await}
</div>

<style>
  .search {
    background: transparent
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
      no-repeat 13px center;
  }
</style>
