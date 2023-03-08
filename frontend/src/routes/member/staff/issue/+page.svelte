<script lang="ts">
  import CopyRegisterId from "./components/CopyRegisterID.svelte";
  import StudentDetails from "./components/StudentDetails.svelte";
  import StudentIdNumber from "./components/StudentIDNumber.svelte";

  let studentID: number = 0;
  let studentDetails: any | null = null;
</script>

<h1 class="mb-4 text-4xl font-semibold lg:ml-8">Issue a Book</h1>

<StudentIdNumber bind:studentID bind:studentDetails />

{#if studentDetails}
  <StudentDetails bind:studentDetails />

  <CopyRegisterId bind:studentID bind:studentDetails />
{/if}
