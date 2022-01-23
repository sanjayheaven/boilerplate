import mongoose, { Schema } from "mongoose"
import { createModel, createSchema } from "../../../../src/plugins/ns-mongodb"
// const ObjectId = Schema.Types.ObjectId

let foodSchema = createSchema({
  sequence: Number,
  categoryId: {
    type: mongoose.SchemaTypes.ObjectId, //角色
    ref: "Category",
  },
  canteenId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Canteen",
  },
  foodName_ch: {
    type: String,
    set(str) {
      return str.normalize("NFKC")
    },
  },
  foodName_en: {
    type: String,
    set(str) {
      return str.normalize("NFKC")
    },
  },
  desc_ch: { type: String },
  desc_en: { type: String },
  ifRecommend: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
})
export const model = createModel(module, foodSchema)
