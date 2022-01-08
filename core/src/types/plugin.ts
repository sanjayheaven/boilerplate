export interface Plugin {
  start: (config?: any) => Promise<void>
  setConfig?: () => object
}

export interface DBPlugin extends Plugin {
  dbActions: [() => any]
  models: []
  schemas: any
}
export interface FrameworkPlugin extends Plugin {}
