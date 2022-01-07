// 路由接口
import Router from "koa-router"
const v1 = new Router({ prefix: "/api/v1/reserves" }) // 业务一级路由用复数
// import Controllers from "./controllers"

// 这部分代码也能 自动生成。

Object.keys(Controllers).forEach((key) => {
  let action = Controllers[key]
  if (key.startsWith("get")) {
    v1.get(`/${key}`, action)
  } else {
    v1.post(`/${key}`, action)
  }
})

// module.exports = [v1]
