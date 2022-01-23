import Koa from "Koa"
import KoaCompose from "koa-compose"
import GlobalMiddlewares from "./middlewares"
import { isFn } from "../../util"
import KoaRouter from "koa-router"
import { ServiceAction } from "../../types/service"
import { Context } from "koa"
import { Controller, ControllerAction, FrameworkConfig, Route } from "./type"
import { join } from "upath"
import { getServices } from "../../services"
import { FrameworkPlugin } from "../../types/plugin"
import pluralize from "pluralize"

const defaultConfig: FrameworkConfig = {
  routerPrefix: "/api",
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
        return { ...acc, [key]: controllerAction, serviceAction }
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

const getRouters = (config?: FrameworkConfig): KoaRouter.IMiddleware[] => {
  let { routerPrefix } = { ...defaultConfig, ...(config || {}) }
  let routes = getRoutes()
  console.log(routes, 119919)
  return routes.reduce((acc: KoaRouter.IMiddleware[], route: Route) => {
    let { controllerAction, serviceFileName, method, serviceAction } = route
    let router = new KoaRouter({
      prefix: join(routerPrefix, pluralize(serviceFileName)),
    })
    let routeMiddlewares = serviceAction.config?.middlewares
    if (method == "GET") {
      router.get(route.path, ...routeMiddlewares, controllerAction)
    } else {
      router.post(route.path, ...routeMiddlewares, controllerAction)
    }
    acc.push(router.routes())
    acc.push(router.allowedMethods())
    return acc
  }, [])
}

const start = async (config?: FrameworkConfig) => {
  const App = new Koa()
  let { port, middlewares = [] } = config || defaultConfig
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

let configuration: FrameworkConfig = defaultConfig
export const Framework: FrameworkPlugin = {
  async start() {
    return start(configuration)
  },
  setConfig(config: FrameworkConfig) {
    configuration = config
    return this
  },
}
