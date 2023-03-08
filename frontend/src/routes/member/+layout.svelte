<script lang="ts">
  import {
    faBars,
    faTableColumns,
    faArrowRightArrowLeft,
    faBookOpen,
    faBook,
    faUsers,
    faRepeat,
  } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa/src/fa.svelte";
  import Icon from "@iconify/svelte";
  import bookArrowRight from "@iconify/icons-mdi/book-arrow-right";
  import bookArrowLeft from "@iconify/icons-mdi/book-arrow-left";

  import type { LayoutData } from "./$types";

  import profile from "$lib/images/profile.jpg";

  import DrawerLink from "./components/DrawerLink.svelte";

  export let data: LayoutData;
  const userName: string = data.user.name;
  const userIDType: string = data.user.id_type;
</script>

<div class="scrollbar drawer-mobile drawer">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <!-- Top bar -->
    <div class="flex items-center gap-2 bg-primary py-2 px-1 text-primary-content lg:hidden">
      <label for="my-drawer-2" class="btn-primary btn drawer-button">
        <Fa class="inline-block" icon={faBars} />
      </label>
      <p class="basis-full text-xl">Library Management System</p>
      <div class="dropdown-bottom dropdown-end dropdown">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="block w-max">
          <div class="btn-primary btn flex h-auto w-auto flex-wrap-reverse items-center gap-4 p-2">
            <p>{userName}</p>
            <img class="h-10 rounded-full" src={profile} alt="profile" />
          </div>
        </label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul
          tabindex="0"
          class="dropdown-content menu rounded-box w-52 bg-base-100 p-2 text-base-content shadow"
        >
          <li><a href={`/member/${userIDType}/profile`}>Update Profile</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </div>
    </div>
    <!-- Page content here -->
    <main class="p-4">
      <slot />
    </main>
  </div>
  <div class="drawer-side">
    <label for="my-drawer-2" class="drawer-overlay" />
    <ul class="menu w-60 max-w-[60vw] bg-primary p-4 text-primary-content">
      <p class="mb-4 hidden text-center text-2xl lg:block">Library Management System</p>
      <div class="dropdown hidden h-auto py-2 lg:block">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="m-auto block w-full">
          <div class="btn-primary btn flex h-auto w-auto flex-col justify-center gap-4 p-2">
            <div class="flex flex-col gap-3">
              <img class="w-24 rounded-full" src={profile} alt="Profile" />
              <div>
                <p>{userName}</p>
                <p class="text-xs">{userIDType}</p>
              </div>
            </div>
          </div>
        </label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul
          tabindex="0"
          class="dropdown-content menu rounded-box w-52 bg-base-100 p-2 text-base-content shadow"
        >
          <li><a href={`/member/${userIDType}/profile`}>Update Profile</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </div>
      <div class="divider hidden lg:flex" />
      <!-- Sidebar content here -->
      {#if userIDType === "student"}
        <DrawerLink href="/member/student/dashboard">
          <Fa class="inline-block" icon={faTableColumns} /> Dashboard
        </DrawerLink>
        <DrawerLink href="/member/student/transaction">
          <Fa class="inline-block" icon={faArrowRightArrowLeft} /> Transaction
        </DrawerLink>
        <DrawerLink href="/member/student/library">
          <Fa class="inline-block" icon={faBookOpen} /> Library
        </DrawerLink>
        <DrawerLink href="/member/student/reserve">
          <Fa class="inline-block" icon={faBook} /> Reserve
        </DrawerLink>
      {:else if userIDType === "staff"}
        <DrawerLink href="/member/staff/dashboard">
          <Fa class="inline-block" icon={faTableColumns} /> Dashboard
        </DrawerLink>
        <DrawerLink href="/member/staff/issue">
          <Icon icon={bookArrowRight} class="mr-1" /> Issue a Book
        </DrawerLink>
        <DrawerLink href="/member/staff/return">
          <Icon icon={bookArrowLeft} class="mr-1" /> Return a Book
        </DrawerLink>
        <DrawerLink href="/member/staff/renew">
          <Fa class="inline-block" icon={faRepeat} /> Renew a Book
        </DrawerLink>
        <div class="divider" />
        <DrawerLink href="/member/staff/members">
          <Fa class="inline-block" icon={faUsers} /> Members
        </DrawerLink>
        <DrawerLink href="/member/staff/reservations">
          <Fa class="inline-block" icon={faBook} /> Reservations
          <div class="badge bg-primary-content">{data.stats.reservations_count}</div>
        </DrawerLink>
      {/if}
    </ul>
  </div>
</div>
