
     const {model:PosFoodModel} = require('../model/posfood')
     module.exports = {
         
     createPosFood: async (data) => {
       return PosFoodModel.create(data)
     },
     deletePosFood: async ({ posFoodId }) => {
       return PosFoodModel.deleteOneById({ _id: posFoodId })
     },
     updatePosFood: async ({ posFoodId, ...data }) => {
        return PosFoodModel.update({ _id: posFoodId }, { $set: { ...data } })
      },
     getPosFoods: async (
          {skip=0,limit=10,filters={},sort={_id:-1}}
          ) => {
        let totalCount = PosFoodModel.countDocuments(filters)
        let items  = PosFoodModel.aggerate([
            {$match:filters},
            {$sort:sort},
            {$skip:skip},
            {$limit:limit}
        ])
        return {totalCount,items}
      },
     getPosFood: async ({ posFoodId }) => {
        return PosFoodModel.findOneById({ _id: posFoodId })
      },
   
     }
     