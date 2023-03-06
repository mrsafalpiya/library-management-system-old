<script lang="ts">
  import Loading from "$lib/components/Loading.svelte";
  import { formatDate, formatDateTime } from "$lib/utils/DateTime";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";

  dayjs.extend(relativeTime);

  async function fetchReserved() {
    const res = await fetch("/api/v1/reservation");
    if (!res.ok) {
      throw "Error: Could not get reserved books";
    }

    const data = await res.json();
    return data.reservations;
  }
</script>

<h1 class="mb-4 text-4xl font-semibold lg:ml-8">Reserve</h1>

<h2 class="mt-8 mb-4 text-2xl">All Reservations</h2>

{#await fetchReserved()}
  <Loading />
{:then reservedBooks}
  <div class="overflow-x-auto">
    <table class="table-compact table sm:w-full">
      <thead>
        <tr>
          <th class="w-10">#</th>
          <th>Book Name</th>
          <th>Author</th>
          <th>Publisher</th>
          <th>Added Date</th>
          <th>By</th>
        </tr>
      </thead>
      <tbody>
        {#each reservedBooks as reservation, i}
          <tr>
            <th>{i + 1}</th>
            <td class="whitespace-normal">{reservation.book_title}</td>
            <td class="whitespace-normal">{reservation.book_author}</td>
            <td class="whitespace-normal">{reservation.book_publisher}</td>
            <td>
              <p class="tooltip tooltip-top" data-tip={formatDateTime(reservation.created_at)}>
                {dayjs().to(reservation.created_at)}
              </p>
            </td>
            <td>{reservation.student_name}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:catch e}
  <p class="text-red-500">{e}</p>
{/await}
