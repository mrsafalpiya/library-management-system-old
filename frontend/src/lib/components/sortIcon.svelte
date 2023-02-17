<script lang="ts">
  import {
    faSort,
    faSortUp,
    faSortDown,
    type IconDefinition,
  } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa/src/fa.svelte";

  export let label: string;
  export let sortQuery: string;

  let icon = getIcon(label);

  function getIcon(label: string): IconDefinition {
    if (sortQuery.startsWith(label)) {
      if (sortQuery.endsWith("asc")) {
        return faSortUp;
      } else {
        return faSortDown;
      }
    }
    return faSort;
  }
</script>

<Fa class="inline-block {icon == faSort && 'text-gray-400'}" {icon} />
