import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import VitePlugin from "./Gganbu/src/api/vite-plugin-model"

export default defineConfig({
  plugins: [vue(), VitePlugin()],
  resolve: {
    alias: [
      { find: "@", replacement: require("path").resolve(__dirname, "src") },
      { find: "~", replacement: require("path").resolve(__dirname, "Gganbu") },
      // {
      //   find: "gganbu/request",
      //   replacement: require("path").resolve(__dirname, "./Gganbu/src/request"),
      // },
    ],
  },
  // logLevel: "silent",
  optimizeDeps: {
    exclude: ["gganbu"],
  },
})
