import { CachePlugin } from "../../types/plugin"
import { CacheConfig } from "./type"
import { createClient } from "redis"

const defaultConfig: CacheConfig = {
  port: 6379,
  host: "127.0.0.1",
  options: {},
}

let client
const start = async (config: CacheConfig) => {
  let { options = defaultConfig.options } = config
  client = createClient()
  console.log(client)
}

let configuration: CacheConfig = defaultConfig
export const Cache: CachePlugin = {
  async start() {
    return start(configuration)
  },
  setConfig(config: CacheConfig) {
    configuration = config
    return this
  },
}
