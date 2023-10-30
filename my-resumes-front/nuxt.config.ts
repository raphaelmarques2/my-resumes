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
      backendUrl:
        process.env.NUXT_PUBLIC_BACKEND_URL || "http://localhost:3001",
    },
  },
});
