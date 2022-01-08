import { App } from "./src/app"
import { Framework, FrameworkConfig } from "./src/plugins/ns-koa"
import { DB, DBConfig } from "./src/plugins/ns-mongodb"

Framework.setConfig({ port: 9527 } as FrameworkConfig)
DB.setConfig({ address: "mongodb://47.243.178.42/canteenDev" } as DBConfig)

App.load(DB).load(Framework).run()
