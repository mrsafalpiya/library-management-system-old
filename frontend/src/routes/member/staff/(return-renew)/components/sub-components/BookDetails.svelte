<script lang="ts">
  import profile from "$lib/images/profile.jpg";
  import dayjs from "dayjs";
  import localizedFormat from "dayjs/plugin/localizedFormat";
  import relativeTime from "dayjs/plugin/relativeTime";

  dayjs.extend(localizedFormat);
  dayjs.extend(relativeTime);

  export let bookDetails: any | null;

  let is_past_due_date = false;
  let past_due_days = 0;

  function calculateIfPastDue(bookDetails: any): boolean {
    const due_date = dayjs(bookDetails.borrowed_date).add(bookDetails.borrow_duration_days, "days");
    if (due_date.isBefore(dayjs())) {
      is_past_due_date = true;
    } else {
      is_past_due_date = false;
    }
    past_due_days = dayjs().diff(due_date, "day");

    return is_past_due_date;
  }
</script>

<div class="mt-4 flex items-center gap-4">
  <!-- Book -->

  <div class="max-w-md">
    <h2 class="text-xl font-bold">{bookDetails.copy_register_id}</h2>
    <h2 class="text-xl font-bold">{bookDetails.title}</h2>
    <p>Publisher: {bookDetails.publisher}</p>
    <p>Author: {bookDetails.author}</p>
  </div>

  <!-- Borrower -->

  <div>
    <div class="flex flex-col items-center justify-center">
      <div class="relative w-24">
        <div class="avatar flex flex-col items-center">
          <div class="relative z-10 rounded-full bg-primary">
            <div>
              <img class="w-24" src={profile} alt="Profile" />
            </div>
          </div>
        </div>
      </div>

      <div class="text-center">
        <p class="font-bold capitalize">{bookDetails.borrower_name}</p>
        <p class="-mt-1">{bookDetails.borrower_id_num}</p>
        {#if bookDetails.borrower_batch}
          <p class="-mt-1">{bookDetails.borrower_batch}</p>
        {/if}
      </div>
    </div>
  </div>
</div>

<p class="mt-4">Issued date: {dayjs(bookDetails.borrowed_date).format("LLLL")}</p>
<p>Duration: {bookDetails.borrow_duration_days} days</p>

{#if calculateIfPastDue(bookDetails)}
  <p class="font-bold text-red-500">This copy is past the due date by {past_due_days} days!</p>
{:else}
  <p class="text-green-500">This copy is within the due date.</p>
{/if}
