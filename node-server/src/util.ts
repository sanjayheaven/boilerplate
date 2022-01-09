import path, { extname } from "upath"
import fs, { existsSync } from "fs"
import { sync } from "pkg-dir"
import createJITI from "jiti"
import { Service } from "./types/service"

const jiti = createJITI(process.cwd(), { cache: false })
export const isFn = (item) => {
  return typeof item === "function"
}
export const isTsOrJsFile = (file) => {
  return [".ts", ".js"].includes(extname(file))
}

/**
 * 列出某个服务的文件，仅限第一层目录以及第一层的文件
 */
export const listServiceFiles = (currentDirPath): Service[] => {
  return fs.readdirSync(currentDirPath).reduce((acc: Service[], file) => {
    let filePath = path.resolve(currentDirPath, file)
    let stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      let indexFile = path.resolve(filePath, "index.ts")
      acc.push({ filePath: indexFile, fileName: file })
    } else {
      if (!isTsOrJsFile(file)) return acc
      let indexFile = path.resolve(filePath)
      acc.push({ filePath: indexFile, fileName: file })
    }
    return acc
  }, [])
}

/**
 * 根据 package.json 找到项目根目录
 */
export const getProjectRoot = (cwd?: string) => {
  return sync(cwd) || process.cwd()
}

/**
 * 动态require文件 包含所有的了 文件只能读取一次 所以需要加一个缓存了
 */
export const importFile = (filePath: string) => {
  const contents = jiti(filePath)
  return contents
}
/**
 * import file 相当于 importFile 的default
 */
export const importFileDefault = (filePath: string) => {
  const contents = importFile(filePath)
  return contents.default || {}
}

/**
 * 判断文件是否存在
 */
export const existFile = (filePath: string) => {
  return existsSync(filePath)
}

/**
 * 首字母大写
 */
export const firstAlphaToUpperCase = (str: string) => {
  let [first, ...rest] = str
  return first.toUpperCase() + rest.join("")
}
