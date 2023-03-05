<script lang="ts">
  import { formatDateTime } from "$lib/utils/DateTime";

  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";

  dayjs.extend(relativeTime);

  export let activities: { type: string; book_name: string; date_time: Date }[] | null;
</script>

<div class="mt-6 flex flex-col items-start gap-1">
  {#if activities && activities.length > 0}
    <ul class="ml-4 mb-6 list-outside list-disc space-y-4">
      {#each activities as activity}
        <li>
          You {activity.type}ed
          <b>{activity.book_name}</b>
          <br />
          <p
            class="tooltip tooltip-right text-sm text-gray-400"
            data-tip={formatDateTime(activity.date_time)}
          >
            {dayjs().to(activity.date_time)}
          </p>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="w-full text-center">No activities</p>
  {/if}
</div>
