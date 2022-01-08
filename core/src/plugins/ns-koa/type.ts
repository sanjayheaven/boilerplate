import { Context } from "koa"

// extends type Service
export interface Controller {
  serviceFilePath: string
  serviceFileName: string
  exports: Object
}

export interface Route {
  path: string
  method: string
  actionName: string
  serviceFilePath: string
  serviceFileName: string
  controllerAction: ControllerAction
}

export interface ControllerAction {
  (ctx: Context): any
}

/**
 * config params
 */
export interface ServerConfig {
  port: Number
  routerPrefix?: String
  middlewares?: []
}
