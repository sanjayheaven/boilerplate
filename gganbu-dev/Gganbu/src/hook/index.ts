import alshooks from "async_hooks"
let AsyncLocalStorage = alshooks.AsyncLocalStorage

export const als = new AsyncLocalStorage()

export const useContext = () => {
  return (als.getStore() || {})["ctx"]
}
export const useConfig = () => {
  return als.getStore()["config"]
}

// only used when upload file
export const useFiles = () => {
  let ctx = useContext()
  return ctx["files"] // ctx.request.files 
}

