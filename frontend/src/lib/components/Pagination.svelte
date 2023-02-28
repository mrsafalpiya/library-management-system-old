<script lang="ts">
  import { faCaretLeft, faCaretRight, faEllipsis } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa/src/fa.svelte";

  export let pageNum: number;
  export let pagesCount: number;
  export let pageRecordsCount: number | null = null;
  export let pageSize: number | null = null;
  export let totalRecords: number | null = null;

  if (pageNum > pagesCount) {
    pageNum = pagesCount;
  }

  if (pageNum == 0) {
    pageNum = 1;
  }

  if (pagesCount == 0) {
    pagesCount = 1;
  }
</script>

<div class="mt-4 flex flex-col items-center justify-center gap-2">
  <!-- Info about the records shown -->
  {#if pageSize && totalRecords && pageRecordsCount}
    <p>
      Showing <b>{(pageNum - 1) * pageSize + 1}</b>
      to
      <b>{(pageNum - 1) * pageSize + pageRecordsCount}</b>
      of
      <b>{totalRecords}</b>
      Entries
    </p>
  {/if}

  <div class="btn-group flex justify-center">
    <!-- Prev page -->
    <button
      class="btn-primary btn-sm btn"
      disabled={pageNum == 1}
      on:click={() => {
        pageNum = pageNum - 1;
      }}
    >
      <Fa class="inline-block" icon={faCaretLeft} />
    </button>

    <!-- First page -->
    <button
      class="btn-primary btn-sm btn"
      class:bg-primary-focus={pageNum == 1}
      on:click={() => {
        pageNum = 1;
      }}
    >
      1
    </button>

    <!-- Page before current -->
    {#if pageNum - 1 > 1}
      {#if pageNum - 2 != 1}
        <button class="btn-primary btn-sm btn pointer-events-none">
          <Fa class="inline-block" icon={faEllipsis} />
        </button>
      {/if}
      <button
        class="btn-primary btn-sm btn"
        on:click={() => {
          pageNum = pageNum - 1;
        }}
      >
        {pageNum - 1}
      </button>
    {/if}

    <!-- Current page -->
    {#if pageNum != 1 && pageNum != pagesCount}
      <button class="btn-primary btn-sm btn bg-primary-focus">
        {pageNum}
      </button>
    {/if}

    <!-- Page after current -->
    {#if pageNum + 1 < pagesCount}
      <button
        class="btn-primary btn-sm btn"
        on:click={() => {
          pageNum = pageNum + 1;
        }}
      >
        {pageNum + 1}
      </button>
      {#if pageNum + 2 != pagesCount}
        <button class="btn-primary btn-sm btn pointer-events-none">
          <Fa class="inline-block" icon={faEllipsis} />
        </button>
      {/if}
    {/if}

    <!-- Last page -->
    {#if pagesCount != 1}
      <button
        class="btn-primary btn-sm btn"
        class:bg-primary-focus={pageNum == pagesCount}
        on:click={() => {
          pageNum = pagesCount;
        }}
      >
        {pagesCount}
      </button>
    {/if}

    <!-- Next page -->
    <button
      class="btn-primary btn-sm btn"
      disabled={pageNum == pagesCount}
      on:click={() => {
        pageNum = pageNum + 1;
      }}
    >
      <Fa class="inline-block" icon={faCaretRight} />
    </button>
  </div>
</div>
