<template>
  <main class="flex-1 p-4 flex items-center justify-center">
    <div class="p-4 bg-white">
      <div class="text-center mb-6">
        <i class="fa fa-hand-peace-o text-2xl" />
        <h1 class="">Hello!</h1>
        <p class="text-sm">Please create your account.</p>
      </div>
      <form @submit.prevent="signup()" class="space-y-6 w-80">
        <TextField label="E-mail" type="email" v-model="email" />
        <TextField label="Password" type="password" v-model="password" />
        <div class="text-center">
          <MainButton
            class="w-60"
            label="Sign Up"
            type="submit"
            :loading="isLoading"
          />
        </div>
      </form>
      <div class="mt-6 text-center">
        <span>
          Already have an account?
          <NuxtLink to="/login">
            <LinkText>Login</LinkText>
          </NuxtLink>
        </span>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { wait } from "~/services/utils";

const email = ref("a@test.com");
const password = ref("123");

const isLoading = ref(false);

async function signup() {
  isLoading.value = true;
  await wait(1000);
  isLoading.value = false;
}
</script>

<style scoped></style>
