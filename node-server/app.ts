import { App } from "./src/app"
import { Framework, FrameworkConfig } from "./src/plugins/ns-koa"
import { DB, DBConfig } from "./src/plugins/ns-mongodb"
import { Cache, CacheConfig } from "./src/plugins/ns-redis"

Framework.setConfig({ port: 9527, middlewares: [] } as FrameworkConfig)
DB.setConfig({ address: "mongodb://127.0.0.1:27017/testLocal" } as DBConfig)
Cache.setConfig({ port: 6379 } as CacheConfig)
// Queue

App.load(DB).load(Framework).run()
// App.load(Framework).load(DB).run()
