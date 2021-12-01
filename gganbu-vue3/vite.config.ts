import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import model from "./Gganbu/vite-plugin-model"
export default defineConfig({
  plugins: [vue(), model()],
  resolve: {
    alias: [
      { find: "@", replacement: require("path").resolve(__dirname, "src") },
      { find: "~", replacement: require("path").resolve(__dirname) },
      {
        find: "gganbu/request",
        replacement: require("path").resolve(__dirname, "./Gganbu/request"),
      },
    ],
  },
})
