import { resolve } from "upath"
import { getResolvedServiceDir } from "./config"
import { Plugin } from "./types/plugin"

const plugins: Plugin[] = []
export default {
  load(plugin: Plugin) {
    plugins.push(plugin)
    console.log(plugins, 1111)
    return this
  },
  async run() {
    for (let plugin of plugins) {
      await plugin.start()
    }
  },
}
