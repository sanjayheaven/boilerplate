import { Model } from "mongoose"
import path from "path"
import pluralize from "pluralize"
import { firstAlphaToUpperCase } from "../../utils"

export const createBasicAction = (
  module: NodeModule,
  model: typeof Model
): object => {
  let name = path.parse(module.filename).name
  let namePluralize = pluralize(name.toLowerCase())
  let Name = firstAlphaToUpperCase(name)
  let NamePluralize = firstAlphaToUpperCase(namePluralize)
  return {
    [`create${Name}`]: async (data: object) => {
      return model.create(data)
    },
    [`get${Name}`]: async ({ _id }) => {
      return model.findById(_id)
    },
    [`delete${Name}`]: async ({ _id }) => {
      return model.deleteOne({ _id })
    },
    [`update${Name}`]: async ({ _id, ...data }) => {
      return model.updateOne({ _id }, { $set: { ...data } })
    },

    [`get${NamePluralize}`]: async ({
      skip = 0,
      limit = 10,
      filters = {},
      sort = { _id: -1 },
    }) => {
      let total = model.countDocuments(filters)
      let items = model.aggregate([
        { $match: filters },
        { $sort: sort },
        { $skip: skip },
        { $limit: limit },
      ])
      return { total, items }
    },
  }
}
