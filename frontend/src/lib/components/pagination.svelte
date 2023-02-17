<script lang="ts">
  export let pageNum: number;
  export let pagesCount: number;

  if (pageNum > pagesCount) {
    pageNum = pagesCount;
  }

  if (pageNum == 0) {
    pageNum = 1;
  }
</script>

<div class="btn-group mt-4 flex justify-center">
  {#each { length: pagesCount } as _, i}
    <button
      class="btn-primary btn"
      class:bg-primary-focus={i + 1 == pageNum}
      on:click={() => {
        pageNum = i + 1;
      }}
    >
      {i + 1}
    </button>
  {/each}
</div>
