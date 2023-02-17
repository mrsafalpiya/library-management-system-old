<script lang="ts">
  import Pagination from "$lib/components/pagination.svelte";
  import SortIcon from "$lib/components/sortIcon.svelte";

  let pageNum: number = 1;
  let pageSize: number = 10;
  let pagesCount: number;
  let totalRecords: number | null = null;
  let pageRecordsCount: number | null = null;
  let searchKeyword = "";

  async function fetchBooks(
    pageNum: number,
    pageSize: number,
    sortQuery: string,
    searchKeyword: string
  ) {
    const response = await fetch(
      `/api/v1/books?page=${pageNum}&size=${pageSize}&sort=${sortQuery}&search=${searchKeyword}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const obj = await response.json();

    pageNum = obj.metadata.current_page;
    pageSize = obj.metadata.page_size;
    pagesCount = obj.metadata.last_page;
    totalRecords = obj.metadata.total_records;
    pageRecordsCount = obj.metadata.page_records_count;

    return obj.books;
  }

  let sortQuery = "code-asc";

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
</script>

<h1 class="mb-4 text-4xl font-semibold lg:ml-8">Library</h1>

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
        placeholder="Search for books"
        class="search input-bordered input w-full pl-9 min-[450px]:w-max"
        bind:value={tempSearchKeyword}
      />
    </form>
  </div>

  {#await fetchBooks(pageNum, pageSize, sortQuery, searchKeyword)}
    <div class="mx-auto w-max">
      <button class="btn-primary loading btn">Loading</button>
    </div>
  {:then books}
    {#if books}
      <div class="overflow-x-auto">
        <table class="table-compact table sm:w-full">
          <thead>
            <tr>
              <th class="w-10">#</th>
              <th class="w-20 cursor-pointer" on:click={() => toggleSort("code")}>
                <span class="mr-1">Code</span>
                <SortIcon label="code" {sortQuery} />
              </th>
              <th class="cursor-pointer" on:click={() => toggleSort("title")}>
                <span class="mr-1">Name</span>
                <SortIcon label="title" {sortQuery} />
              </th>
              <th class="cursor-pointer" on:click={() => toggleSort("author")}>
                <span class="mr-1">Author</span>
                <SortIcon label="author" {sortQuery} />
              </th>
              <th class="cursor-pointer" on:click={() => toggleSort("publisher")}>
                <span class="mr-1">Publisher</span>
                <SortIcon label="publisher" {sortQuery} />
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {#each books as book, i}
              <tr>
                <th>{i + 1}</th>
                <td>{book.code}</td>
                <td class="whitespace-normal">{book.title}</td>
                <td class="whitespace-normal">{book.author}</td>
                <td class="whitespace-normal">{book.publisher}</td>
                <td><button class="text-primary-focus hover:underline">Reserve</button></td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {:else}
      <p class="text-center">No books available</p>
    {/if}
    <Pagination bind:pageNum bind:pagesCount {totalRecords} {pageSize} {pageRecordsCount} />
  {:catch}
    <p class="text-center">Oops. Something's wrong</p>
  {/await}
</div>

<style>
  .search {
    background: transparent
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
      no-repeat 13px center;
  }
</style>
