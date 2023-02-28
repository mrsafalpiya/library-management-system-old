<script lang="ts">
  import { fade } from "svelte/transition";

  import Spinner from "$lib/images/spinner.svg";
  import PrimeCollegeLogo from "$lib/images/prime-college.jpg";
</script>

<div class="fixed top-0 right-0 bottom-0 left-0 z-50 grid place-items-center bg-white" out:fade>
  <div class="flex flex-col items-center">
    <img src={PrimeCollegeLogo} alt="Prime College" class="w-full max-w-[250px]" />
    <img src={Spinner} alt="Spinner" class="w-full max-w-[100px]" />
  </div>
</div>
