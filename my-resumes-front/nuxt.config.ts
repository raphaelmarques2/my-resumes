// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-headlessui"],

  headlessui: { prefix: "H" },

  colorMode: {
    preference: "light",
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  runtimeConfig: {
    public: {
      BACKEND_URL: process.env.BACKEND_URL || "",
    },
  },
});
