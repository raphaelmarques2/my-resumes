<template>
  <main class="flex-1 p-4 flex items-center justify-center">
    <div class="p-4 bg-white">
      <div class="text-center mb-6">
        <i class="fa fa-hand-peace-o text-2xl" />
        <h1 class="">Hello!</h1>
        <p class="text-sm">Please create your account.</p>
      </div>
      <form @submit.prevent="signup()" class="space-y-6 w-80">
        <TextField label="Name" type="name" v-model="name" />
        <TextField label="E-mail" type="email" v-model="email" />
        <TextField label="Password" type="password" v-model="password" />
        <div class="text-center">
          <MainButton
            class="w-60"
            label="Sign Up"
            type="submit"
            :loading="isLoading"
          />
          <p class="text-red-500" v-if="errorMessage">
            {{ errorMessage }}
          </p>
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
import { ApiError } from "~/services/backend/generated/core/ApiError";

const router = useRouter();
const auth = useAuth();

const name = ref("");
const email = ref("");
const password = ref("");

const isLoading = ref(false);

const errorMessage = ref("");

async function signup() {
  errorMessage.value = "";
  isLoading.value = true;
  await auth
    .signup({
      name: name.value,
      email: email.value,
      password: password.value,
    })
    .catch((err: ApiError) => {
      errorMessage.value = err.body.message || "Unknown error";
    });
  isLoading.value = false;

  if (auth.isLoggedIn.value) {
    await router.push("/my-resumes");
  }
}
</script>

<style scoped></style>
