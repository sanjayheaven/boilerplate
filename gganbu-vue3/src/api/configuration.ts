import { defineServerConfig } from "gganbu/dist/config"
import middlewares from "../middlewares"

export default defineServerConfig({
  middlewares: middlewares,
  port: 9527,
})
