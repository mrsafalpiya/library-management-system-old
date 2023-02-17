<script lang="ts">
  import type { LayoutData } from "./$types";
  import AllActivities from "./components/allActivities.svelte";
  import BooksBorrowed from "./components/booksBorrowed.svelte";

  export let data: LayoutData;
</script>

<h1 class="mb-4 text-4xl font-semibold lg:ml-8">Transaction</h1>

<BooksBorrowed borrows={data.borrows.list} />

<AllActivities />
