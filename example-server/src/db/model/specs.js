const mongoose = require("mongoose")
require("mongoose-long")(mongoose)
const {
  Types: { Long },
} = mongoose

const schema = {
  foodId: {
    type: mongoose.SchemaTypes.ObjectId, //角色
    ref: "Food",
  },
  canteenId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Canteen",
  },
  specs_ch: { type: String },
  specs_en: { type: String },
  seq: { type: Number },
  // price: { type: Number },
  // oprice: { type: Number },
  // packagingFee: { type: Number, default: 0 },
  cover_ch: { type: String },
  cover_en: { type: String },
  createdAt: { type: Date, default: Date.now },
  // ifDiscount: { type: Boolean, default: false },
  // minCount: { type: Number, default: 1 },
  // maxCount: { type: Number },
  // ifRequirementRule: { type: Boolean, default: true },
  // ifFeeRule: { type: Boolean, default: true },
}

// Food 也可以自动生成。
const path = require("path")
const firstAlphaToUpperCase = (string) => {
  let [first, ...rest] = string
  return first.toUpperCase() + rest.join("")
}
let FileName = firstAlphaToUpperCase(path.parse(__filename).name)
//
module.exports = {
  schema: mongoose.Schema(schema),
  model: mongoose.model(FileName, mongoose.Schema(schema)),
}
