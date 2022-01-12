import { resolve } from "upath"
import { getResolvedServiceDir } from "./config"
import { Plugin } from "./types/plugin"
import { Service } from "./types/service"
import { importFile, listServiceFiles } from "./util"

export const getServices = (): Service[] => {
  let resolvedServiceDir = getResolvedServiceDir()
  let files = listServiceFiles(resolvedServiceDir)
  return files.map((file) => {
    // need filter the service that is async fn 
    return { ...file, exports: importFile(file.filePath) }
  })
}
