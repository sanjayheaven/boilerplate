import { defineConfig } from "./Gganbu/src/config"
export default defineConfig({
  controllerDir: "./src/api",
  routerPrefix: "/api/v1",
  baseURL: "http://127.0.0.1:3333",
  port: 3333,
})
