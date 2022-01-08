import { DBPlugin } from "../../types/plugin"
import mongoose from "mongoose"
import { DBConfig } from "./type"

const defaultConfig: DBConfig = {
  address: "",
  options: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
}

const start = async (config: DBConfig) => {
  let { address, options = defaultConfig.options } = config
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise
    mongoose.connect(address, options, (err: any) => {
      if (err) {
        reject(`😫: Connected failed, check your MongoDB with ${address}`)
      } else {
        resolve(`🍟: Successfully connected to MongoDB at ${address}`)
      }
    })
  })
}

let configuration: DBConfig = defaultConfig
export const DB: DBPlugin = {
  actions: [({}) => {}],
  async start() {
    let res = await start(configuration)
    console.log(res)
    return res
  },
  setConfig(config: DBConfig) {
    configuration = config
    return this
  },
}

export { DBConfig } from "./type"
