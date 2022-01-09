import { resolve } from "upath"
import { ProjectConfig } from "./types/config"
import { getProjectRoot } from "./util"

/**
 * 根据项目配置，找到services服务所在目录地址
 */
export const getResolvedServiceDir = () => {
  const root = getProjectRoot()
  return resolve(root, "./services")
}

/**
 * 自定义项目配置
 */
export const defineConfig = (config: ProjectConfig) => {
  return config
}
