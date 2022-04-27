import { defineConfig } from "./Gganbu/src/config"
import { Framework, FrameworkConfig } from "./Gganbu/src/framework/koa"

Framework.setConfig({ port: 9527, middlewares: [] } as FrameworkConfig)

export default defineConfig({
  serviceDir: "./src/api",
  port: 9527,
  plugins: [Framework],
})

/**
 *
 */
