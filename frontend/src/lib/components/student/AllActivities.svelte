<script lang="ts">
  import ActivityList from "./ActivityList.svelte";

  import Pagination from "$lib/components/Pagination.svelte";

  export let prefix = "You";

  export let studentID: string | null = null;

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
    let requestInit: RequestInit = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    if (studentID) {
      requestInit.body = JSON.stringify({
        student_id: studentID,
      });
    }

    const response = await fetch(
      `/api/v1/student/transaction?type=${type}&page=${pageNum}&size=${pageSize}`,
      requestInit
    );

    const obj = await response.json();

    pageNum = obj.metadata.current_page;
    pageSize = obj.metadata.page_size;
    pagesCount = obj.metadata.last_page;

    return obj.transactions;
  }
</script>

<div>
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
      <button class="btn loading btn-primary">Loading</button>
    </div>
  {:then obj}
    <ActivityList activities={obj} {prefix} />
    <Pagination bind:pageNum bind:pagesCount />
  {:catch _}
    <p class="w-full text-center">Oops! Something went wrong.</p>
  {/await}
</div>
