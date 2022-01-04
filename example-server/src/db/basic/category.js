
     const {model:CategoryModel} = require('../model/category')
     module.exports = {
         
     createCategory: async (data) => {
       return CategoryModel.create(data)
     },
     deleteCategory: async ({ categoryId }) => {
       return CategoryModel.deleteOneById({ _id: categoryId })
     },
     updateCategory: async ({ categoryId, ...data }) => {
        return CategoryModel.update({ _id: categoryId }, { $set: { ...data } })
      },
     getCategories: async (
          {skip=0,limit=10,filters={},sort={_id:-1}}
          ) => {
        let totalCount = CategoryModel.countDocuments(filters)
        let items  = CategoryModel.aggerate([
            {$match:filters},
            {$sort:sort},
            {$skip:skip},
            {$limit:limit}
        ])
        return {totalCount,items}
      },
     getCategory: async ({ categoryId }) => {
        return CategoryModel.findOneById({ _id: categoryId })
      },
   
     }
     