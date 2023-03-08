<script lang="ts">
  import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa/src/fa.svelte";
  import profile from "$lib/images/profile.jpg";

  export let studentDetails: any;
</script>

<div class="card flex flex-row justify-center">
  <!-- Profile -->

  <div>
    <div class="card-body flex basis-10 flex-col items-center justify-center">
      <div class="relative w-24">
        <div class="avatar flex flex-col items-center">
          <div
            class="relative z-10 rounded-full bg-primary {studentDetails.borrows.borrows_count >
              0 && 'ring'} {studentDetails.borrows.has_late_borrows
              ? 'ring-red-500'
              : 'ring-primary-focus'} ring-offset-1 ring-offset-base-100"
          >
            <div>
              <img class="w-24" src={profile} alt="Profile" />
            </div>
          </div>
        </div>

        {#if studentDetails.borrows.has_late_borrows}
          <Fa
            class="absolute -top-6 right-0 z-10 text-4xl text-red-500"
            icon={faTriangleExclamation}
          />
        {/if}
      </div>

      <div class="text-center">
        <p class="font-bold capitalize">{studentDetails.user.name}</p>
        <p class="-mt-1">{studentDetails.user.id_num}</p>
        {#if studentDetails.user.batch}
          <p class="-mt-1">{studentDetails.user.batch}</p>
        {/if}

        {#if studentDetails.borrows.has_late_borrows}
          <p class="font-bold text-red-500">The student has books to return!</p>
        {/if}
      </div>
    </div>
  </div>

  <!-- Borrows -->

  <div class="card-body flex flex-col items-start">
    <h2 class="text-xl font-bold">Borrows ({studentDetails.borrows.borrows_count})</h2>
    <ol class="list-decimal">
      {#each studentDetails.borrows.list as borrow}
        <li class={borrow.is_late && "font-bold text-red-500"}>{borrow.title}</li>
      {/each}
    </ol>
  </div>
</div>
