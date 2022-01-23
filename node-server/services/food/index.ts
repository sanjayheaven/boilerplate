import { ServiceAction } from "../../src/types/service"
import DBActions from "./DB/actions"

export const getFoods: ServiceAction = async () => {
  return DBActions.getFoods()
}
getFoods.config = {
  middlewares: [],
}
