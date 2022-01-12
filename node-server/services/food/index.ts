import { ServiceAction } from "../../src/types/service"
import DBActions from "./DAO/actions"

export const getFoods: ServiceAction = async ({}) => {
  return DBActions.getFoods()
}
