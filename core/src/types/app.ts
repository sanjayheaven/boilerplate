import { Plugin } from "./plugin"

export interface IApp {
  load(plugin: Plugin): IApp
  run(): Promise<void>
}
