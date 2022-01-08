import Koa from "Koa"
import KoaCompose from "koa-compose"
import GlobalMiddlewares from "./middlewares"
import { getServices } from "../../services"
import { isFn } from "../../util"
import KoaRouter from "koa-router"
import { ServiceAction } from "../../types/service"
import { Context } from "koa"
import { Controller, ControllerAction, Route, ServerConfig } from "./type"
import { join } from "upath"

const defaultConfig: ServerConfig = {
  routerPrefix: "/api/v1",
  port: 3000,
}

const getControllers = (): Controller[] => {
  let services = getServices()
  return services.map((i) => {
    let { exports = {}, filePath, fileName } = i
    Object.keys(exports).forEach((i) => !isFn(exports[i]) && delete exports[i])
    return {
      serviceFileName: fileName,
      serviceFilePath: filePath,
      exports: Object.keys(exports).reduce((acc, key) => {
        let serviceAction: ServiceAction = exports[key]
        let controllerAction: ControllerAction = async (ctx: Context) => {
          if (key.startsWith("get")) {
            let query = ctx.request.query
            let res = await serviceAction(query)
            ctx.body = res
          } else {
            let body = ctx.request.body
            let res = await serviceAction(body)
            ctx.body = res
          }
        }
        return { ...acc, [key]: controllerAction }
      }, {}),
    }
  })
}

const getRoutes = () => {
  let controllers = getControllers()
  return controllers.reduce((acc: Route[], controller: Controller) => {
    let { exports = {}, serviceFilePath, serviceFileName } = controller
    Object.keys(exports).forEach((i) => !isFn(exports[i]) && delete exports[i])
    let routes = Object.keys(exports)
      .filter((key) => key != "default")
      .map((key) => {
        return {
          path: "/" + key,
          method: (key.startsWith("get") && "GET") || "POST",
          actionName: key,
          serviceFilePath,
          serviceFileName,
          controllerAction: exports[key],
        }
      })
    return [...acc, ...routes]
  }, [])
}

const getRouters = (config?: ServerConfig): KoaRouter.IMiddleware[] => {
  let { routerPrefix } = config || defaultConfig
  let routes = getRoutes()
  return routes.reduce((acc: KoaRouter.IMiddleware[], route: Route) => {
    let { controllerAction, serviceFileName } = route
    let name = serviceFileName
    let router = new KoaRouter({ prefix: join(routerPrefix, name) })
    if (route.method == "GET") {
      router.get(route.path, controllerAction)
    } else {
      router.post(route.path, controllerAction)
    }
    acc.push(router.routes())
    acc.push(router.allowedMethods())
    return acc
  }, [])
}

const start = async (config?: ServerConfig) => {
  const App = new Koa()
  let { port,  middlewares = [] } = config || defaultConfig
  // load router
  const routers = getRouters(config || defaultConfig)
  // load middlewares,
  App.use(KoaCompose([...middlewares, ...GlobalMiddlewares, ...routers]))
  //   start
  let server = App.listen(port, () => {
    console.log(
      `👻  :Server is now listening for the requests at port: ${port} `
    )
  })
  // pm2 平滑更新
  process.on("SIGINT", () => {
    server.keepAliveTimeout = 1
    server.close(() => {
      process.exit(0)
    })
  })
}

export default {
  start,
}
