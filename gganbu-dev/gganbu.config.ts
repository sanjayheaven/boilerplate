import { Cache, DB, Framework, defineConfig } from "./Gganbu/src"

Framework.setConfig({ port: 9527, middlewares: [] })
DB.setConfig({ address: "mongodb://127.0.0.1:27017/testLocal" })

export default defineConfig({
  serviceDir: "./src/api",
  port: 9527,
  plugins: [Cache, DB, Framework],
})
