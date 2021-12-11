// import { defineConfig } from "./Gganbu/src/config"
import { defineConfig } from "gganbu"
import middlewares from "./src/middlewares"
export default defineConfig({
  controllerDir: "./src/api",
  routerPrefix: "/api",
  build: {},
  middlewares,
  // request:
})
