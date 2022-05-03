export { default as VitePlugin } from "./api/vite-plugin-model"
// export * as VitePlugin from "./api/vite-plugin-model"
// export * from "./request" // 谨慎导出

export { defineConfig } from "./config"
export { Cache } from "./cache/redis"
export { DB } from "./db/mongodb"
export { Framework } from "./framework/koa"
