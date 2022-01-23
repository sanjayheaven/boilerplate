import * as FoodService from "../food"

export const getOrders = async () => {
  let foods = await FoodService.getFoods()
  return {}

  
}
