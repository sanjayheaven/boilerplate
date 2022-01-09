import { Model } from "mongoose"

export const createBasicActions = (model) => {
  return {
    create: async (data: object) => {
      return model.create(data)
    },
    delete: async ({ _id }) => {
      return model.deleteOneById({ _id })
    },
    update: async ({ _id, ...data }) => {
      return model.update({ _id }, { $set: { ...data } })
    },
    getMany: async ({
      skip = 0,
      limit = 10,
      filters = {},
      sort = { _id: -1 },
    }) => {
      let totalCount = model.countDocuments(filters)
      let items = model.aggerate([
        { $match: filters },
        { $sort: sort },
        { $skip: skip },
        { $limit: limit },
      ])
      return { totalCount, items }
    },
    getOne: async ({ _id }) => {
      return model.findOneById({ _id })
    },
  }
}
