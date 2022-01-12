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
  ifTime: Boolean,
  timeList: [
    {
      timeStart: String,
      timeEnd: String,
    },
  ],
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
  buffetId: [String],
  ifBuffet: Boolean,
  desc_ch: { type: String },
  desc_en: { type: String },
  ifRecommend: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  customize: [
    {
      title_ch: String,
      title_en: String,
      ifMultiple: Boolean, //flavors中的值是否可多选
      ifMust: { type: Boolean, default: false }, //flavors中的值是否必选
      flavors: [
        {
          text_ch: String,
          text_en: String,
          addPrice: { type: Number, default: 0 },
        },
      ],
    },
  ],
})
export const model = createModel(module, foodSchema)
