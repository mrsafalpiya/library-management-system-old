<script lang="ts">
  import dashboardCover from "$lib/images/dashboard_cover.png";
  import { faBookOpen, faUsers } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa/src/fa.svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<h1 class="mb-4 text-4xl font-semibold lg:ml-8">Dashboard</h1>

<div
  class="hero relative -ml-4 h-[300px] w-[calc(100%+2rem)]"
  style="background-image: url({dashboardCover});"
>
  <div class="hero-overlay bg-opacity-80" />
  <div class="hero-content absolute bottom-0 text-center text-neutral-content">
    <div class="max-w-md">
      <h1 class="mb-5 text-5xl font-bold">Welcome to the Library</h1>
      <div class="flex justify-center gap-2">
        <a href="/member/student/library" class="btn-primary btn btn-sm">Issue</a>
        <a href="/member/student/library" class="btn-primary btn btn-sm">Return</a>
        <a href="/member/student/library" class="btn-primary btn btn-sm">Renew</a>
      </div>
    </div>
  </div>
</div>

<div class="mt-4 flex justify-center">
  <div class="stats stats-vertical shadow sm:stats-horizontal">
    <div class="stat">
      <div class="stat-figure text-primary">
        <Fa class="text-3xl" icon={faBookOpen} />
      </div>
      <div class="stat-title">Total Books</div>
      <div class="stat-value text-secondary">{data.stats.books_count}</div>
    </div>

    <div class="stat">
      <div class="stat-figure text-primary">
        <Fa class="text-3xl" icon={faUsers} />
      </div>
      <div class="stat-title">Total Members</div>
      <div class="stat-value text-secondary">
        {data.stats.students_count + data.stats.staffs_count + data.stats.reservations_count}
      </div>
      <div class="stat-desc">
        Staff: {data.stats.staffs_count}, Student: {data.stats.students_count}
      </div>
    </div>
  </div>
</div>
