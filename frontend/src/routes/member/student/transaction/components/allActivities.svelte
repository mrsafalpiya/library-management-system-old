<script lang="ts">
  import ActivityList from "$lib/components/ActivityList.svelte";

  import Pagination from "$lib/components/Pagination.svelte";

  let activityTabs = [
    {
      title: "All",
      type: ".*",
    },
    {
      title: "Borrows",
      type: "borrow",
    },
    {
      title: "Returns",
      type: "return",
    },
    {
      title: "Others",
      type: "other",
    },
  ];
  let activityTabSelected = 0;

  let pageNum: number = 1;
  let pageSize: number = 6;
  let pagesCount: number;

  async function fetchActivities(type: string, pageNum: number, pageSize: number) {
    const response = await fetch(
      `/api/v1/student/transaction?type=${type}&page=${pageNum}&size=${pageSize}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const obj = await response.json();

    pageNum = obj.metadata.current_page;
    pageSize = obj.metadata.page_size;
    pagesCount = obj.metadata.last_page;

    return obj.transactions;
  }
</script>

<h2 class="mt-8 mb-4 text-2xl">All Activities</h2>

<div class="tabs tabs-boxed mb-4 bg-transparent">
  {#each activityTabs as tab, i}
    <button
      class="tab"
      class:tab-active={activityTabSelected == i}
      on:click={() => (activityTabSelected = i)}
    >
      {tab.title}
    </button>
  {/each}
</div>

{#await fetchActivities(activityTabs[activityTabSelected].type, pageNum, pageSize)}
  <div class="mx-auto w-max">
    <button class="btn-primary loading btn">Loading</button>
  </div>
{:then obj}
  <ActivityList activities={obj} />
  <Pagination bind:pageNum bind:pagesCount />
{:catch _}
  <p>Oops. Something's wrong.</p>
{/await}
