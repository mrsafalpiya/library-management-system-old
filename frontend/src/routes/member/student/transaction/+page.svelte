<script lang="ts">
  import type { LayoutData } from "./$types";
  import AllActivities from "$lib/components/student/AllActivities.svelte";
  import BooksBorrowed from "$lib/components/student/BooksBorrowed.svelte";

  export let data: LayoutData;
</script>

<h1 class="mb-4 text-4xl font-semibold lg:ml-8">Transaction</h1>

<h2 class="mt-8 mb-4 text-2xl">Books Borrowed</h2>

<BooksBorrowed borrows={data.borrows.list} />

<h2 class="mt-8 mb-4 text-2xl">All Activities</h2>

<AllActivities />
