<!-- eslint-disable ts/consistent-type-definitions -->
<script setup lang="ts">
import type { RequestError } from '@/api/main/http-client';
import { useUserStore } from '@/store/user';
import { login } from '@/auth';

type Credentials = {
  email: string
  password: string
};

const email = ref<string | null>(null);
const password = ref<string | null>(null);
const error = ref<RequestError | string | null>(null);
const userStore = useUserStore();

const errorFormatted = computed(() => {
  // eslint-disable-next-line eqeqeq
  if (error.value?.email || error.value?.password || error.value == 'INVALID_PAYLOAD')
    return 'Wrong username or password';

  if (error.value)
    return 'Something went wrong';

  return null;
});

async function onSubmit() {
  if (email.value === null || password.value === null) {
    error.value = 'INVALID_PAYLOAD';
    return;
  }
  try {
    const credentials: Credentials = {
      email: email.value!,
      password: password.value!,
    };

    await login({ credentials });

    await navigateTo({ path: '/home' });
  }
  catch (err: any) {
    error.value = err.response.data;
  }
}

onMounted(() => {
  email.value = 'admin';
  password.value = 'password';
});
</script>

<template>
  <div>
    <div :class="$style.loginWrapper">
      <div :class="$style.loginFormPanel">
        <h1 class="absolute top-[60px] mx-auto my-0 mb-10 w-full text-center">
          <a href="/" target="_blank" rel="noopener" class="translate-y-0 translate-z-0 transform text-blue-500 no-underline opacity-100">
            APP_TITLE
          </a>
        </h1>

        <div :class="$style.loginFormWrapper">
          <form :class="$style.loginForm" @submit.prevent="onSubmit">
            <div class="w-full text-center">
              <div class="text-center">
                <small class="text-[18px] font-normal leading-[22px] text-gray-400">
                  Login to start
                </small>
              </div>

              <!-- Fields Container -->
              <div class="mt-5 text-left">
                <!-- Warning notice for failed login -->
                <div v-if="error" class="mt-5 border-2 border-yellow-500 rounded-md border-solid bg-yellow-100 p-4 py-5 text-yellow-700" role="alert">
                  {{ errorFormatted }}
                </div>

                <!-- Email -->
                <div class="mt-4">
                  <div class="flex flex-col">
                    <label
                      for="email"
                      class="mb-1 mt-2 block font-semibold uppercase text-gray-600"
                    >E-mail</label>
                    <input
                      id="email"
                      v-model="email"
                      type="text"
                      class="relative block w-full appearance-none border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:z-10 focus:border-indigo-500 sm:text-sm focus:shadow-inner focus:outline-none focus:ring-indigo-500 placeholder-gray-500"
                      name="username"
                      autocomplete="off" spellcheck="false" required autofocus
                    >
                  </div>
                </div>

                <!-- Password field -->
                <div class="mt-5">
                  <label
                    for="password"
                    class="mb-1 mt-2 block font-semibold uppercase text-gray-600"
                  >Password</label>
                  <div class="flex flex-col">
                    <input
                      id="password"
                      v-model="password"
                      name="password" :class="$style.loginInput"
                      type="password"
                      placeholder=""
                      autocomplete="off" spellcheck="false" maxlength="128"
                    >
                  </div>
                </div>

                <!-- Bottom -->
                <!-- Forgot Password -->
                <div class="mt-5">
                  <div class="mt-1">
                    <a href="" class="lead card-link pl-0 pr-0">Forgot Your Password?</a>
                  </div>
                  <div class="mt-2">
                    <button :class="$style.loginButton" style="opacity: 0.6" type="submit">
                      Login
                    </button>
                  </div>
                  <div class="small mt-1">
                    <span>Need an account? <span><a href="" class="card-link">Request Here</a></span></span>
                  </div>
                </div>
              </div>
              <!-- End Fields Container -->
            </div>
          </form>
        </div>
        <!-- End loginFormWrapper -->
      </div>
    </div>
  </div>
</template>

<style module>
.loginInput {
  @apply appearance-none rounded-md relative block w-full px-3 py-2;
  @apply border border-gray-300 placeholder-gray-500 text-gray-900;
  @apply focus:shadow-inner focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10;
  @apply sm:text-sm;
}

.loginButton {
  @apply relative w-full flex justify-center;
  @apply py-2 px-4 border border-transparent;
  @apply text-sm font-medium rounded-md text-white;
  @apply bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300;
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
}

.loginWrapper {
  @apply absolute flex flex-col;
  @apply w-screen h-screen;
  @apply overflow-hidden overflow-y-auto;
  background-color: rgb(218, 218, 218);
}

.loginFormWrapper {
  @apply top-0 right-0 bottom-0 left-0 h-full;
  @apply flex items-center justify-center w-auto;

}

.loginFormPanel {
  @apply absolute top-0 left-0 w-full h-full;

}

.loginForm {
  @apply box-border w-[480px];
  @apply p-12 py-16;
  @apply text-gray-600 select-none;
  @apply rounded-md shadow-md;
  background-color: rgba(250, 250, 250, 0.63);

}

@screen sm {

  .loginFormPanel {
    @apply flex justify-center w-full h-full overflow-hidden;
    @apply max-h-[1000px];
    @apply min-h-[750px];
  }
}

@screen lt-sm {
  .loginFormWrapper {
    @apply w-full h-full;
  }

  .loginForm {
    background-color: rgba(250, 250, 250, 0.63);
    @apply box-border w-[480px];
    @apply p-10;
    @apply text-gray-600 select-none;
    @apply rounded-md shadow-md;
    @apply top-0 right-0 bottom-0 left-0;
    @apply flex items-center justify-center;
    @apply w-full h-full min-h-[500px];
    @apply p-[70px] px-[40px] pb-[40px];
    @apply rounded-none;
  }
}
</style>
