
     const {model:CanteenModel} = require('../model/canteen')
     module.exports = {
         
     createCanteen: async (data) => {
       return CanteenModel.create(data)
     },
     deleteCanteen: async ({ canteenId }) => {
       return CanteenModel.deleteOneById({ _id: canteenId })
     },
     updateCanteen: async ({ canteenId, ...data }) => {
        return CanteenModel.update({ _id: canteenId }, { $set: { ...data } })
      },
     getCanteens: async (
          {skip=0,limit=10,filters={},sort={_id:-1}}
          ) => {
        let totalCount = CanteenModel.countDocuments(filters)
        let items  = CanteenModel.aggerate([
            {$match:filters},
            {$sort:sort},
            {$skip:skip},
            {$limit:limit}
        ])
        return {totalCount,items}
      },
     getCanteen: async ({ canteenId }) => {
        return CanteenModel.findOneById({ _id: canteenId })
      },
   
     }
     