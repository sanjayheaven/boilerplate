import { createApiSDK } from "./api"
import { run } from "./cli"
import { isApiFile } from "./util"

export default function () {
  let server
  return {
    name: "Gganbu/vite-plugin-model", // 必须的，将会在 warning 和 error 中显示
    async transform(code, file) {
      let res = isApiFile(file)
      if (!res) return null
      let api = await createApiSDK(code, file)
      return { code: api }
    },
    async configureServer(_server) {
      if (!server) {
        await run()
      }
      _server.middlewares.use(async (req, res, next) => {
        next()
      })
    },
    // config: () => {
    //   return { logLevel: "silent" }
    // },
  }
}
