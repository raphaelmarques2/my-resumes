<template>
  <header class="px-4 py-4 bg-white shadow-md fixed w-full">
    <div class="flex justify-center gap-10">
      <NuxtLink to="/">
        <TabItem label="Home" :selected="isHome" />
      </NuxtLink>
      <NuxtLink to="/my-resumes" v-if="isLoggedIn">
        <TabItem label="My Resumes" :selected="isMyResumes" />
      </NuxtLink>
      <NuxtLink to="/about">
        <TabItem label="About" :selected="isAbout" />
      </NuxtLink>
    </div>
    <div class="absolute right-6 top-0 bottom-0 flex items-center gap-1">
      <template v-if="!isLoggedIn">
        <NuxtLink href="/login">
          <TextButton label="Login" />
        </NuxtLink>
        <NuxtLink href="/signup">
          <MainButton label="Signup" />
        </NuxtLink>
      </template>
      <template v-if="isLoggedIn">
        <TextButton label="Logout" color="red" @click="onSignOutClick()" />
      </template>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();

const isHome = computed(() => route.path == "/");
const isMyResumes = computed(() => route.path === "/my-resumes");
const isAbout = computed(() => route.path == "/about");

const auth = useAuth();

const isLoggedIn = computed(() => auth.isLoggedIn.value);

function onSignOutClick() {
  auth.logout();
}
</script>

<style scoped></style>
