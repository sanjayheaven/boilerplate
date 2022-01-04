const { model: SpecsModel } = require("../model/specs")
module.exports = {
  createSpecs: async (data) => {
    return SpecsModel.create(data)
  },
  deleteSpecs: async ({ specsId }) => {
    return SpecsModel.deleteOneById({ _id: specsId })
  },
  updateSpecs: async ({ specsId, ...data }) => {
    return SpecsModel.update({ _id: specsId }, { $set: { ...data } })
  },
  getSpecs: async ({
    skip = 0,
    limit = 10,
    filters = {},
    sort = { _id: -1 },
  }) => {
    let totalCount = SpecsModel.countDocuments(filters)
    let items = SpecsModel.aggerate([
      { $match: filters },
      { $sort: sort },
      { $skip: skip },
      { $limit: limit },
    ])
    return { totalCount, items }
  },
  getSpecs: async ({ specsId }) => {
    return SpecsModel.findOneById({ _id: specsId })
  },
}
