import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { VitePlugin } from "gganbu"

export default defineConfig({
  plugins: [vue(), VitePlugin()],
  resolve: {
    alias: [
      { find: "@", replacement: require("path").resolve(__dirname, "src") },
    ],
  },
  // logLevel: "silent",
  optimizeDeps: {
    exclude: ["gganbu"],
  },
})
