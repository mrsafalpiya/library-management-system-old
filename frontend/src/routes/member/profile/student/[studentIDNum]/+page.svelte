<script lang="ts">
  import profile from "$lib/images/profile.jpg";
  import AllActivities from "$lib/components/student/AllActivities.svelte";
  import BooksBorrowed from "$lib/components/student/BooksBorrowed.svelte";

  import type { LayoutData } from "./$types";
  export let data: LayoutData;
</script>

<div class="flex flex-col items-center gap-6">
  <div class="flex flex-col items-center gap-1">
    <h1 class="text-4xl font-semibold">{data.user.name}</h1>
    <h3 class="text-2xl font-semibold">{data.user.id_num}</h3>
    <h3 class="-mt-2 text-2xl font-semibold">{data.user.batch}</h3>
    <div class="badge-primary badge badge-lg mt-1">Student</div>
  </div>

  <div class="flex w-full flex-col items-center justify-evenly gap-8 md:flex-row md:gap-0">
    <div class="order-3 basis-[calc(33%-100px)] text-center md:order-none md:text-left">
      <h3 class="-mt-2 basis-[calc(33%-100px)] text-sm font-bold uppercase text-gray-400 md:mt-0">
        Contact
      </h3>

      <div class="mt-2 md:mt-6">
        <p>{data.user.contact}</p>
        <p>{data.user.address}</p>
        <p>{data.user.email}</p>
      </div>
    </div>

    <img
      class="order-1 w-full max-w-[200px] place-items-center rounded md:order-none"
      src={profile}
      alt="Profile"
    />

    <div class="order-2 basis-[calc(33%-100px)] text-center md:order-none md:text-right">
      <h3 class="text-sm font-bold uppercase text-gray-400">Books borrowed</h3>

      <div class="mt-2 md:mt-6">
        <p class="text-6xl">{data.borrows.borrows_count}</p>
      </div>
    </div>
  </div>
</div>

<div class="mt-4 flex flex-col gap-4">
  <h2 class="text-2xl">Books Borrowed</h2>

  <BooksBorrowed borrows={data.borrows.list} />

  <h2 class="text-2xl">All Activities</h2>

  <AllActivities prefix="The student" />
</div>
