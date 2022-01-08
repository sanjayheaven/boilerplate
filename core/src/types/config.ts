import { FrameworkPlugin, DBPlugin } from "./plugin"

/**
 * project config
 */
export interface ProjectConfig {
  framework?: FrameworkPlugin
  db?: DBPlugin
}
