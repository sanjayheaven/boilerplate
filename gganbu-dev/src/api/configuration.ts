import { defineServerConfig } from "gganbu"
import middlewares from "../middlewares"

export default defineServerConfig({
  middlewares: middlewares,
  port: 9527,
})
