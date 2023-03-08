<script lang="ts">
  import { page } from "$app/stores";

  import { getFlash } from "sveltekit-flash-message/client";
  const flash = getFlash(page);

  export let studentID: number;
  export let studentDetails: any | null;

  async function handleStudentIDSubmission(event: SubmitEvent) {
    const element = event.target as HTMLFormElement;
    const submitBtn = element.getElementsByClassName("btn")[0];
    submitBtn.classList.add("loading");

    const formData = new FormData(element);
    const studentIDNum = formData.get("student-id-num");

    const res = await fetch("/api/v1/user/student/" + studentIDNum);
    const data = await res.json();
    if (!res.ok) {
      if (res.status == 500) {
        $flash = { type: "error", message: "could not fetch student data" };
      } else {
        $flash = { type: "error", message: data.error };
      }

      studentDetails = null;
      submitBtn.classList.remove("loading");
      return;
    }

    $flash = undefined;

    studentDetails = data;
    studentID = parseInt(data.user.id);

    submitBtn.classList.remove("loading");
  }
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<!-- svelte-ignore a11y-autofocus -->
<form
  class="form-control w-full max-w-md"
  on:submit|preventDefault={(e) => handleStudentIDSubmission(e)}
>
  <label class="label">
    <span class="label-text">Student ID Number</span>
  </label>
  <div class="flex items-center gap-3">
    <input
      type="text"
      placeholder="Scan here"
      class="input-bordered input w-full max-w-xs"
      name="student-id-num"
      required
      autofocus
    />
    <button class="btn-primary btn">Search</button>
  </div>
</form>
