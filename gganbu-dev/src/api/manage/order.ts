// 订单相关页面

import { useContext } from "../../../Gganbu/src/hook"
import { UploadFile } from "../../../Gganbu/src/framework/koa/middlewares"

// export const config = {}

const logger = async (ctx, next) => {
  const start = Date.now()
  console.log("日志开始", ctx.request.body)
  await next()
  const cost = Date.now() - start
  console.log(`request ${ctx.url} cost ${cost}ms`)
}

export const getInfo = async ({ hello, world }) => {
  const ctx = useContext()
  return {
    hello,
    world,
    msg: "99899111",
  }
}
export const postInfo = async (data) => {
  // console.log(data, 191919)
  return {
    data,
    msg: "this is post method from server",
  }
}
// getInfo.config = { middlewares: [logger] }

export const uploadImage = async (files: any) => {
  const ctx = useContext()
  console.log(ctx.method, 12233, 1234)
  return "this is image uploaded url"
}

uploadImage.config = {
  middlewares: [UploadFile()],
}
