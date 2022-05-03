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

export const postInfo = async (data) => {
  return {
    data,
    msg: "this is post method from server",
  }
}
// getInfo.config = { middlewares: [logger] }

export const uploadImage = async (files: any) => {
  const ctx = useContext()
  console.log(ctx.method, 12233, 1234)
  return "this is image uploaded url 11"
}
uploadImage.config = {
  middlewares: [UploadFile()],
}

import { UserModel, UserBasicAction } from "../../db/model/user"

export const getInfo = async ({ hello, world }) => {
  console.log(UserModel, 19191997777, UserBasicAction)
  await UserModel.create({
    username: "this is username",
    password: "this is password1",
    name: "this is name",
  })
  let test = await UserModel.find().limit(1)
  console.log(test, 9998889)
  return { hello, world, msg: "99899111111" }
}
