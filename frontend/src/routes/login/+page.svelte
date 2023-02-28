<script lang="ts">
  import PrimeCollegeLogo from "$lib/images/prime-college.jpg";
  import LoginForm from "./components/LoginForm.svelte";
</script>

<div class="flex h-[100dvh] flex-col items-center justify-center gap-4">
  <img src={PrimeCollegeLogo} alt="Prime College" class="w-full max-w-[250px]" />

  <h1 class="text-4xl font-bold">Login</h1>

  <LoginForm />
</div>
