<script lang="ts">
  import { formatDate } from "$lib/utils/DateTime";

  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";

  dayjs.extend(relativeTime);

  export let borrows:
    | {
        register_id: string;
        title: string;
        author: string;
        publisher: string;
        issue_date: Date;
        due_date: Date;
        is_late: boolean;
      }[]
    | null = null;
</script>

<h2 class="mt-8 mb-4 text-2xl">Books Borrowed</h2>

<div class="overflow-x-auto">
  {#if borrows}
    <table class="table sm:w-full">
      <thead>
        <tr>
          <th class="w-10">#</th>
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
          <tr class:text-red-500={borrow.is_late} class:font-bold={borrow.is_late}>
            <th>{i + 1}</th>
            <td class="whitespace-normal">{borrow.register_id}</td>
            <td class="whitespace-normal">{borrow.title}</td>
            <td class="whitespace-normal">{borrow.author}</td>
            <td class="whitespace-normal">{borrow.publisher}</td>
            <td class="whitespace-normal">{formatDate(borrow.issue_date)}</td>
            <td class="whitespace-normal">
              {formatDate(borrow.due_date)} ({dayjs().to(borrow.due_date)})
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <p class="text-center">No books borrowed</p>
  {/if}
</div>
