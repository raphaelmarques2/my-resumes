// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-headlessui"],

  headlessui: { prefix: "H" },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  runtimeConfig: {
    public: {
      NUXT_BACKEND_URL: process.env.NUXT_BACKEND_URL || "http://localhost:3001",
    },
  },
});
