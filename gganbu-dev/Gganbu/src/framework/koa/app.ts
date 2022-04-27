import Koa from "Koa"
import KoaRouter from "koa-router"
import KoaCompose from "koa-compose"
import GlobalDefaultMiddlewares from "./middlewares"
import { convertFileToRoute, isFn } from "../../utils"
import { Service, ServiceAction } from "../../service/type"
import { Context, FrameworkConfig, Route } from "./type"
import { getServices } from "../../service"
import { FrameworkPlugin } from "../../plugins/type"

const defaultConfig: FrameworkConfig = {
  port: 3000,
}

const getRoutes = () => {
  let services = getServices()
  return services.reduce((acc: Route[], service: Service) => {
    let { exports = {}, filePath } = service
    Object.keys(exports).forEach((i) => !isFn(exports[i]) && delete exports[i]) // 函数即服务，删除非函数
    let routes = Object.keys(exports)
      .filter((key) => key != "default") // default 函数
      .map((key) => {
        let path = "/" + key
        let method = (key.startsWith("get") && "GET") || "POST"
        let routerPrefix = convertFileToRoute(filePath)
        let serviceAction: ServiceAction = exports[key]
        let controllerAction = async (ctx: Context) => {
          let params = method == "GET" ? ctx.request.query : ctx.request.body
          ctx.body = await serviceAction(params)
        }
        return { path, method, routerPrefix, serviceAction, controllerAction }
      })
    return [...acc, ...routes]
  }, [])
}

const getRouters = (): KoaRouter.IMiddleware[] => {
  let routes = getRoutes()
  console.log(routes, 191929)
  let res = routes.reduce((acc: KoaRouter.IMiddleware[], route: Route) => {
    let { controllerAction, routerPrefix, method, serviceAction } = route
    let router = new KoaRouter({ prefix: routerPrefix })
    let routeMiddlewares = serviceAction?.config?.middlewares || []
    if (method == "GET") {
      router.get(route.path, ...routeMiddlewares, controllerAction)
    } else {
      router.post(route.path, ...routeMiddlewares, controllerAction)
    }
    acc.push(router.routes())
    acc.push(router.allowedMethods())
    return acc
  }, [])
  return res
}

const start = async (config?: FrameworkConfig) => {
  const App = new Koa()
  let { port, middlewares = [] } = config || defaultConfig
  // load router
  const routers = getRouters()
  console.log(routers, 1111)
  // load middlewares,
  App.use(KoaCompose([...middlewares, ...GlobalDefaultMiddlewares, ...routers]))
  //   start
  let server = App.listen(port, () => {
    console.log(`👻  :Server listening at port: ${port} `)
  })
  // 平滑更新
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
