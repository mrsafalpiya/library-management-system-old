<script lang="ts">
  import { formatDate } from "$lib/utils/dateTime";

  export let borrows:
    | {
        register_id: string;
        title: string;
        author: string;
        publisher: string;
        issue_date: Date;
        due_date: Date;
        due_date_string: string;
        is_late: boolean;
      }[]
    | null = null;
</script>

<h2 class="mt-8 mb-4 text-2xl">Books Borrowed</h2>

<div class="overflow-x-auto">
  {#if borrows}
    <table class="table w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Register ID</th>
          <th>Book Name</th>
          <th>Author</th>
          <th>Publisher</th>
          <th>Issue Date</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        {#each borrows as borrow, i}
          <tr class:text-red-500={borrow.is_late}>
            <th>{i + 1}</th>
            <td>{borrow.register_id}</td>
            <td>{borrow.title}</td>
            <td>{borrow.author}</td>
            <td>{borrow.publisher}</td>
            <td>{formatDate(borrow.issue_date)}</td>
            <td>{formatDate(borrow.due_date)} ({borrow.due_date_string})</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <p class="text-center">No books borrowed</p>
  {/if}
</div>
