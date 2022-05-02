import { defineConfig } from "./Gganbu/src/config"
import { Framework } from "./Gganbu/src/framework/koa"
import { DB } from "./Gganbu/src/db/mongodb"
Framework.setConfig({ port: 9527, middlewares: [] })
DB.setConfig({ address: "mongodb://127.0.0.1:27017/testLocal" })
export default defineConfig({
  serviceDir: "./src/api",
  port: 9527,
  plugins: [DB, Framework],
})
