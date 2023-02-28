<script lang="ts">
  import { page } from "$app/stores";

  export let href: string;
</script>

<li>
  <a {href} class:bg-primary-focus={$page.url.pathname === href}>
    <slot />
  </a>
</li>
