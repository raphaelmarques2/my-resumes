import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        darkblue: {
          "50": "#1e3a8a",
          "100": "#1e3a8a",
          "200": "#1e3a8a",
          "300": "#1e3a8a",
          "400": "#1e3a8a",
          "500": "#1e3a8a",
          "600": "#1e3a8a",
          "700": "#1e3a8a",
          "800": "#1e3a8a",
          "900": "#1e3a8a",
          "950": "#1e3a8a",
        },
      },
    },
  },
};
