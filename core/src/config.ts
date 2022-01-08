import { resolve } from "upath"
import { ProjectConfig } from "./types/config"
import { existFile, getProjectRoot, importFileDefault } from "./util"

/**
 * 默认项目配置
 */

export const getProjectConfig = (): ProjectConfig => {
  const root = getProjectRoot()
  let jsFile = resolve(root, "ns.config.js")
  let tsFile = resolve(root, "ns.config.ts")
  let filePath = (existFile(jsFile) && jsFile) || (existFile(tsFile) && tsFile)
  if (!filePath) return {}
  return importFileDefault(filePath)
}

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
