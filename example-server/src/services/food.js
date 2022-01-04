const { ObjectId } = require("bson")
const CategoryActions = require("../db/basic/category")
const FoodActions = require("../db/basic/food")
const SpecsActions = require("../db/basic/specs")
const PosFoodActions = require("../db/basic/posFood")
const posFood = require("../db/model/posFood")

module.exports = self = {
  ...FoodActions,
  // FoodActions 里面 有getFoods

  // 重写 Food
  createFood: async (info) => {
    // 验证传入参数 caterogyId canteenId 要存在
    // 需要组要要增加字段 序列号
    let { categoryId, canteenId } = info || {}
    if (!categoryId || !canteenId) {
      // 报错
      return {}
    }
    return await FoodActions.createFood(info)
  },
  deleteFood: async (foodId) => {
    let food = await FoodActions.deleteFood(foodId)
    let specs = await SpecsActions.getSpecs({ foodId }) //  关联表 或者外键 的操作，需要注意下，有时候不用表的_id 做操作， 数据库需要在扩展基础操作
    // 以下的操作 都是因为分表 所以需要去做的。
    await SpecsActions.deleteMany(specs.map((i) => ObjectId(i._id))) //  现在 数据库基础操作没有，可以增加一个 删除多个item 的action，
    await CategoryActions.deleteCategory({ categoryId: food.categoryId }) //
    await PosFoodActions.deletePosFood({ foodId: posFood }) //  关联表的操作，需要注意下，有时候不用表的_id 做操作，
    // 这个方面的话，所以数据库基础还可以再补充，根据 scheme 查看类型是ObjectId 等同于 _id 查询
  },
  updateFood: async ({ foodId, ...info }) => {
    //   这里基本等于数据库操作
    let food = await FoodActions.updateFood({ foodId, ...info })
  },
  getFoodsWithCategoryInfo: async () => {
    // 这种借口 就比较宽松，一开始可以不写。 除非在定义业务模型的时候，就必须包含分类信息
    // 接受参数是 查询foods的信息
    let foods = await self.getFoods({ 查询Foods的参数 })
    let categoryIds = foods.map((item) => ObjectId(food.categoryId)) // 这是因为 设计表的时候 categoryId 是在 food 表上了
    let categorys = await CategoryActions.getCategories(categoryIds)
    return foods.map((item) => {
      return {
        ...item,
        categoryInfo: categorys.find((i) => i._id == item.categoryId) || {},
      }
    })
  },
  getFoods: async ({ foodIds, name }) => {
    return FoodActions.getFoods(参数)
  },

  getFoodsForPos: async ({ ifSale, name, foodIds }) => {
    // 满足条件的 okPosFoods
    let okPosFoods =
      (ifSale !== undefined &&
        (await PosFoodActions.getPosFoods({ foodIds, ifSale }))) ||
      null

    // 相当于复用了一个接口
    let foods = await self.getFoods({ foodIds, name })
  },
  getFoodsForPosWithCategoryInfo: async ({ ifSale, name, foodIds }) => {
    // 满足条件的 okPosFoods
    let okPosFoods =
      (ifSale !== undefined &&
        (await PosFoodActions.getPosFoods({ foodIds, ifSale }))) ||
      null

    // 相当于复用了一个接口
    let foods = await self.getFoodsWithCategoryInfo({ foodIds, name })
  },
  getFoodsForTakeaway: async () => {},
}
