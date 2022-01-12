import { createBasicActions } from "../../../../src/plugins/ns-mongodb/action"
import { model as FoodModel } from "../models/food"
import { model as CategoryModel } from "../models/category"
const FoodBasicActions = createBasicActions(FoodModel)
// const CategoryBasicActions = createBasicActions(CategoryModel)

export default {
  ...FoodBasicActions,
  getFoods: async () => {
    // let cr = FoodBasicActions.
    return "hehllo 这是产品"
  },
  getOne: async () => {
    // let cr = FoodBasicActions.
    return "hehllo 这是产品"
  },
}
