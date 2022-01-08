import { IApp } from "./types/app"
import { Plugin } from "./types/plugin"

const plugins: Plugin[] = []

export const App: IApp = {
  load(plugin) {
    plugins.push(plugin)
    return App
  },
  async run() {
    for (let plugin of plugins) {
      await plugin.start()
    }
  },
}
