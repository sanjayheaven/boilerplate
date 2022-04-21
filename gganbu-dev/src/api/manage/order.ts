// 订单相关页面

import { ServiceAction } from "Gganbu/src/types/service"

export const config = {}

const logger = async (ctx, next) => {
  const start = Date.now()
  console.log("日志开始", ctx.request.body)
  await next()
  const cost = Date.now() - start
  console.log(`request ${ctx.url} cost ${cost}ms`)
}

export const getInfo: ServiceAction = async (data, data1?: any) => {
  return {
    data: data,
    msg: "1266",
  }
}
getInfo.config = { middlewares: [logger] }

export const createOrder = async (name: string) => {
  return {
    data: name,
    msg: "测试一样更新",
  }
}

export default () => {
  console.log("export default")
  return "default"
}
