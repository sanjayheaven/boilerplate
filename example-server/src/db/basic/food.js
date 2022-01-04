
     const {model:FoodModel} = require('../model/food')
     module.exports = {
         
     createFood: async (data) => {
       return FoodModel.create(data)
     },
     deleteFood: async ({ foodId }) => {
       return FoodModel.deleteOneById({ _id: foodId })
     },
     updateFood: async ({ foodId, ...data }) => {
        return FoodModel.update({ _id: foodId }, { $set: { ...data } })
      },
     getFoods: async (
          {skip=0,limit=10,filters={},sort={_id:-1}}
          ) => {
        let totalCount = FoodModel.countDocuments(filters)
        let items  = FoodModel.aggerate([
            {$match:filters},
            {$sort:sort},
            {$skip:skip},
            {$limit:limit}
        ])
        return {totalCount,items}
      },
     getFood: async ({ foodId }) => {
        return FoodModel.findOneById({ _id: foodId })
      },
   
     }
     