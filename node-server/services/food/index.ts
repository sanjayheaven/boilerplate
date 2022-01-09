import { ServiceAction } from "../../src/types/service"
import * as DBActions from "./DAO/actions"

export const getFoods: ServiceAction = async ({}) => {
  return DBActions.getFoods()
}
