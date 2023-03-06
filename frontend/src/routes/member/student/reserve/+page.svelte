<script lang="ts">
  import Loading from "$lib/components/Loading.svelte";
  import { formatDate } from "$lib/utils/DateTime";

  let reservedBooks: any = [];

  async function fetchReserved() {
    const res = await fetch("/api/v1/reservation/my");
    if (!res.ok) {
      return;
    }

    const data = await res.json();
    reservedBooks = data.reservations;
  }

  async function removeReservation(e: MouseEvent, reservationID: number) {
    const element = e.target as HTMLElement;

    element.classList.add("loading");

    const res = await fetch(`/api/v1/reservation/${reservationID}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      element.innerText = "Could not remove";
      element.style.pointerEvents = "none";
      return;
    }

    element.classList.remove("loading");

    reservedBooks = reservedBooks.filter((b: any) => b.id != reservationID);
  }
</script>

<h1 class="mb-4 text-4xl font-semibold lg:ml-8">Reserve</h1>

<h2 class="mt-8 mb-4 text-2xl">Your Reservations</h2>

<div class="overflow-x-auto">
  <table class="table sm:w-full">
    <thead>
      <tr>
        <th class="w-10">#</th>
        <th>Book Name</th>
        <th>Author</th>
        <th>Publisher</th>
        <th>Added Date</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#await fetchReserved()}
        <Loading />
      {:then}
        {#each reservedBooks as reservation, i}
          <tr>
            <th>{i + 1}</th>
            <td class="whitespace-normal">{reservation.title}</td>
            <td class="whitespace-normal">{reservation.author}</td>
            <td class="whitespace-normal">{reservation.publisher}</td>
            <td class="whitespace-normal">{formatDate(reservation.created_at)}</td>
            <td>
              <button
                class="btn btn-ghost btn-xs text-red-500"
                on:click={(e) => removeReservation(e, reservation.id)}
              >
                Remove
              </button>
            </td>
          </tr>
        {/each}
      {/await}
    </tbody>
  </table>
</div>
