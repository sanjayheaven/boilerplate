import mongoose, { Model, pluralize } from "mongoose"

export const createBasicActions = (model: typeof Model) => {
  let name = model.modelName
  let schema = model.schema
  console.log(name, "看看modelName，")
  return {
    create: async (data: object) => {
      return model.create(data)
    },
    delete: async ({ _id }) => {
      return model.deleteOne({ _id })
    },
    update: async ({ _id, ...data }) => {
      return model.updateOne({ _id }, { $set: { ...data } })
    },
    getMany: async ({
      skip = 0,
      limit = 10,
      filters = {},
      sort = { _id: -1 },
    }) => {
      let totalCount = model.countDocuments(filters)
      let items = model.aggregate([
        { $match: filters },
        { $sort: sort },
        { $skip: skip },
        { $limit: limit },
      ])
      return { totalCount, items }
    },
    getOne: async ({ _id }) => {
      return model.findById({ _id })
    },
  }
}
