<script lang="ts">
  import { goto } from "$app/navigation";

  import { onMount } from "svelte";

  import type { PageData } from "./$types";

  export let data: PageData;

  onMount(() => {
    goto(`/member/${data.user.id_type.toLowerCase()}/dashboard`);
  });
</script>
