<template>
  <main>
    <h1 class="bg-blue-500">Login</h1>
    <h1 class="bg-darkblue-500">Login</h1>
    <div v-if="!user" class="w-80 my-4">
      <form :state="loginState" :validate="validateLogin" @submit.prevent="onLoginClick()" class="space-y-4" >
        <div label="Email" name="email">
          <input placeholder="email" v-model="loginState.email" icon="i-heroicons-envelope" />
        </div>
        <div label="Password" name="password">
          <input placeholder="password" v-model="loginState.password" icon="i-heroicons-lock-closed" />
        </div>
        <button type="submit" :loading="isLoading" block >Login</button>
      </form>
    </div>
    <div v-if="user" class="my-4">
      <div>
        <label>Name:</label>
        <span>{{ user.name }}</span>
      </div>
      <div>
        <label>Email:</label>
        <span>{{ user.email }}</span>
      </div>
    </div>
    <div v-if="user">
      <form>
        <button color="primary" @click.prevent="onLogoutClick()">Logout</button>
      </form>
    </div>
    <div>
      <p>
        <div>User: {{ user?.email }}</div>
        <div>Pending: {{ pending }}</div>
        <div>Error: {{ error }}</div>
        <div>Status: {{ status }}</div>
      </p>
    </div>
    <div>
      <TestDropdown />
    </div>
  </main>
</template>

<script setup lang="ts">
import { User, backend } from "@/services/fakeBackendService";
import { FormError } from "@nuxt/ui/dist/runtime/types";
import { wait } from "~/services/utils";

const currentToken = useCookie<string|null>("AUTH_TOKEN");

const loginState = ref({
  email: "a@test.com",
  password: "123",
})

const validateLogin = (state: any): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  if (!state.password) errors.push({ path: 'password', message: 'Required' })
  console.log('errors', errors)
  return errors
}

const {
  data:user,
  pending,
  error,
  status,
  refresh,
} = useAsyncData<User | null>("user", async () => {
  if (!currentToken.value) return null;
  const user = await backend.getUser(currentToken.value);
  if(!user) currentToken.value = null
  return user;
});

watch(user,(newValue) => {
  console.log('user changed: ',newValue)
})

const isLoading = ref(false)

async function onLoginClick() {
  console.log('onLoginClick')
  isLoading.value = true
  await wait(1000)
  const newToken = await backend.login(loginState.value.email, loginState.value.password);
  if (newToken) {
    const userResult = await backend.getUser(newToken);
    user.value = userResult;
    currentToken.value = newToken;
  }
  isLoading.value = false
}
async function onLogoutClick() {
  currentToken.value = "";
  await refresh()
}
</script>

<style scoped></style>
