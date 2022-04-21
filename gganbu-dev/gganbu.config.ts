import { defineConfig } from "./Gganbu/src/config/index"
import { Framework, FrameworkConfig } from "./Gganbu/src/framework/koa"

Framework.setConfig({ port: 9527, middlewares: [] } as FrameworkConfig)

export default defineConfig({
  controllerDir: "./src/api",
  serviceDir: "./src/api",
  routerPrefix: "/api",
  // baseURL: "http://127.0.0.1:9527",
  port: 9527,
  plugins: [Framework],
})

/**
 *
 */
