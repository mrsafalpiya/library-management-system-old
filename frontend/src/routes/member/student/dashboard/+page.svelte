<script lang="ts">
  import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa/src/fa.svelte";

  import profile from "$lib/images/profile.jpg";
  import dashboard_cover from "$lib/images/dashboard_cover.png";
  import { formatDateTime } from "$lib/utils/dateTime";

  import type { LayoutData } from "./$types";
  export let data: LayoutData;
  /* data.borrows.has_late_borrows = true; */
</script>

<h1 class="mb-4 text-4xl font-semibold lg:ml-8">Dashboard</h1>

<div
  class="hero relative -ml-4 h-[300px] w-[calc(100%+2rem)]"
  style="background-image: url(/src/lib/images/dashboard_cover.png);"
>
  <div class="hero-overlay bg-opacity-80" />
  <div class="hero-content absolute bottom-0 text-center text-neutral-content">
    <div class="max-w-md">
      <h1 class="mb-5 text-5xl font-bold">Welcome to the Library</h1>
      <a href="/member/student/library" class="btn-primary btn">Browse Books</a>
    </div>
  </div>
</div>

<div class="mt-2 flex flex-col-reverse items-center gap-5 lg:flex-row lg:items-start">
  <div class="card basis-full bg-base-100 p-6 shadow-xl lg:w-96">
    <h1 class="text-2xl font-bold">Recent activities</h1>
    <div class="mt-6 flex flex-col items-start gap-1">
      <ul class="ml-4 mb-6 list-outside list-disc space-y-4">
        {#if data.transactions}
          {#each data.transactions as transaction}
            <li>
              You {transaction.type}ed
              <b>{transaction.book_name}</b>
              <br />
              <p
                class="tooltip tooltip-right text-sm text-gray-400"
                data-tip={formatDateTime(transaction.date_time)}
              >
                {transaction.date_time_string}
              </p>
            </li>
          {/each}
        {:else}
          <p>No recent activities</p>
        {/if}
      </ul>
      {#if data.transactions}
        <a
          href="/member/student/transaction#all-activities"
          class="absolute bottom-4 ml-6 text-sm text-gray-500 hover:underline"
        >
          See all
        </a>
      {/if}
    </div>
  </div>

  <div class="card flex w-96 justify-center bg-base-100 shadow-xl">
    <div class="card-body flex flex-col items-center justify-center">
      <div class="relative w-24">
        <div class="avatar flex flex-col items-center">
          <div
            class="relative z-10 rounded-full bg-primary {data.borrows.borrows_count > 0 &&
              'ring'} {data.borrows.has_late_borrows
              ? 'ring-red-500'
              : 'ring-primary-focus'} ring-offset-1 ring-offset-base-100"
          >
            <div>
              <img class="w-24" src={profile} />
            </div>
          </div>
        </div>

        {#if data.borrows.has_late_borrows}
          <Fa
            class="absolute -top-6 right-0 z-10 text-4xl text-red-500"
            icon={faTriangleExclamation}
          />
        {/if}
      </div>

      <div class="text-center">
        <p class="font-bold capitalize">{data.user.name}</p>
        <p class="-mt-1">{data.user.id_num}</p>
        {#if data.user.batch}
          <p class="-mt-1">{data.user.batch}</p>
        {/if}

        {#if data.borrows.has_late_borrows}
          <a class="font-bold text-red-500 hover:underline" href="/member/student/transaction">
            You have books to return!
          </a>
        {/if}
      </div>

      <a
        class="card w-80 cursor-pointer bg-base-200 text-base-content hover:bg-base-300"
        href="/member/student/transaction"
      >
        <div class="card-body items-center text-center">
          <h2
            class="card-title text-4xl font-extrabold {data.borrows.has_late_borrows
              ? 'text-red-500'
              : data.borrows.borrows_count > 0 && 'text-primary-focus'}"
          >
            {data.borrows.borrows_count}
          </h2>
          <p class="-mt-2">Books Borrowed</p>
        </div>
      </a>
    </div>
  </div>
</div>
